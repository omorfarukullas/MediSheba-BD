import admin from 'firebase-admin';

let app: admin.app.App;

function getFirebaseAdmin(): admin.app.App {
  if (app) return app;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    console.warn(
      '[Firebase Admin] Missing credentials — auth will fall back to DB lookup (dev mode)'
    );
    // Return a placeholder so the rest of the app doesn't crash on startup
    app = admin.initializeApp({
      projectId: projectId ?? 'medisheba-bd',
    });
    return app;
  }

  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });

  console.info('[Firebase Admin] Initialized for project:', projectId);
  return app;
}

export const firebaseAdmin = getFirebaseAdmin();

/**
 * Verify a Firebase ID token and return the decoded payload.
 * Returns null if invalid or Firebase Admin is not properly initialised.
 */
export async function verifyFirebaseToken(
  token: string
): Promise<admin.auth.DecodedIdToken | null> {
  try {
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);
    return decoded;
  } catch {
    return null;
  }
}

