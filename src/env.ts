import { vercel } from "@t3-oss/env-core/presets";
import { createEnv } from "@t3-oss/env-nextjs";
import { join, map } from "lodash";
import { type ZodError, z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).optional(),
    DATABASE_URL: z.string({ required_error: "DATABASE_URL is required" }).url("DATABASE_URL must be a valid URL"),
    LOGTO_APP_ID: z.string({ required_error: "LOGTO_APP_ID is required" }),
    LOGTO_APP_SECRET: z.string({ required_error: "LOGTO_APP_SECRET is required" }),
    LOGTO_ENDPOINT: z
      .string({ required_error: "LOGTO_ENDPOINT is required" })
      .url("LOGTO_ENDPOINT must be a valid URL"),
    LOGTO_COOKIE_SECRET: z.string({ required_error: "LOGTO_COOKIE_SECRET is required" }),
    BASE_URL: z
      .string({ required_error: "BASE_URL is required" })
      .url("BASE_URL must be a valid URL")
      .optional()
      .default("http://localhost:3000"),
    TELEGRAM_BOT_TOKEN: z.string({ required_error: "PAYMENT_LINK_KEY is required" }),
    PAYMENT_API_KEY: z.string({ required_error: "PAYMENT_API_KEY is required" }),
    TELEGRAM_API_KEY: z.string({ required_error: "TELEGRAM_API_KEY is required" }),
  },
  client: {
    NEXT_PUBLIC_TELEGRAM_BOT_LINK: z.string().url("NEXT_PUBLIC_TELEGRAM_BOT_LINK must be a valid URL"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_TELEGRAM_BOT_LINK: process.env.NEXT_PUBLIC_TELEGRAM_BOT_LINK,
  },
  emptyStringAsUndefined: true,
  extends: [vercel],
  onValidationError: (error: ZodError) => {
    throw new Error(
      `❌ Invalid environment variables:\n\n${join(
        map(error.flatten().fieldErrors, (e) => `${e?.join("\n")}`),
        "\n",
      )}`,
    );
  },
  onInvalidAccess: (variable: string) => {
    throw new Error(`❌ Attempted to access a server-side environment variable on the client (${variable})`);
  },
});
