import { router, publicProcedure } from '../trpc.js';
import { LlamaChatPromptSchema } from '@medisheba/zod-schemas';
import { llamaService } from '../services/llama.service.js';

export const aiRouter = router({
  chat: publicProcedure
    .input(LlamaChatPromptSchema)
    .mutation(async ({ input }) => {
      return llamaService.generateHealthAdvice(input);
    })
});

