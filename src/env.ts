import { vercel } from '@t3-oss/env-core/presets';
import { createEnv } from '@t3-oss/env-nextjs';
import { join, map } from 'lodash';
import { z, ZodError } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string({ required_error: 'DATABASE_URL is required' }).url('DATABASE_URL must be a valid URL'),
  },
  client: {},
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
  extends: [vercel],
  onValidationError: (error: ZodError) => {
    throw new Error(
      `❌ Invalid environment variables:\n\n${join(
        map(error.flatten().fieldErrors, (e) => `${e?.join('\n')}`),
        '\n'
      )}`
    );
  },
  onInvalidAccess: (variable: string) => {
    throw new Error(`❌ Attempted to access a server-side environment variable on the client (${variable})`);
  },
});
