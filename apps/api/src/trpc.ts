import 'dotenv/config';
import { initTRPC, TRPCError } from '@trpc/server';
import type * as express from 'express';
import { prisma } from './lib/prisma.js';
import { verifyFirebaseToken } from './lib/firebase-admin.js';
import type { UserRole } from '@medisheba/types';

export interface Context {
  req: express.Request;
  res: express.Response;
  user?: {
    id: string;
    firebaseUid: string;
    email: string;
    role: UserRole;
  } | null;
}

export const createContext = async ({
  req,
  res,
}: {
  req: express.Request;
  res: express.Response;
}): Promise<Context> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { req, res, user: null };
  }

  const token = authHeader.split(' ')[1];

  try {
    // ── Step 1: Verify Firebase ID token ─────────────────────────────────────
    const decoded = await verifyFirebaseToken(token);

    if (!decoded) {
      return { req, res, user: null };
    }

    // ── Step 2: Look up (or auto-create) user in our DB ───────────────────────
    let user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
    });

    if (!user && decoded.email) {
      // First login: create user record automatically
      user = await prisma.user.create({
        data: {
          firebaseUid: decoded.uid,
          email: decoded.email,
          fullName: decoded.name ?? decoded.email.split('@')[0],
          role: 'PATIENT', // default role; admin can elevate later
          isVerified: true,
        },
      });
    }

    if (!user) return { req, res, user: null };

    return {
      req,
      res,
      user: {
        id: user.id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        role: user.role as UserRole,
      },
    };
  } catch (err) {
    return { req, res, user: null };
  }
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const roleProcedure = (allowedRoles: UserRole[]) =>
  protectedProcedure.use(({ ctx, next }) => {
    if (!allowedRoles.includes(ctx.user.role)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `Forbidden: requires one of [${allowedRoles.join(', ')}]`,
      });
    }
    return next();
  });
