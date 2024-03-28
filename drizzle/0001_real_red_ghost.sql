ALTER TABLE "telegram_link_tokens" ALTER COLUMN "valid_until" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "telegram_username" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "telegram_avatar" text;