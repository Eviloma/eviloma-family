DO $$ BEGIN
 CREATE TYPE "subscription_categories" AS ENUM('Other', 'Youtube', 'Spotify');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "transaction_categories" AS ENUM('Other', 'Youtube', 'Spotify', 'Deposit');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"category" "subscription_categories" DEFAULT 'Other' NOT NULL,
	"price" integer NOT NULL,
	"date" timestamp NOT NULL,
	CONSTRAINT "subscriptions_id_unique" UNIQUE("id"),
	CONSTRAINT "subscriptions_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "telegram_link_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" text NOT NULL,
	"token" text NOT NULL,
	"valid_until" timestamp DEFAULT now() + INTERVAL '15 minutes',
	CONSTRAINT "telegram_link_tokens_id_unique" UNIQUE("id"),
	CONSTRAINT "telegram_link_tokens_user_unique" UNIQUE("user"),
	CONSTRAINT "telegram_link_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" text NOT NULL,
	"title" text NOT NULL,
	"category" "transaction_categories" DEFAULT 'Other' NOT NULL,
	"suma" integer NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "transactions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_subscriptions" (
	"user_id" text NOT NULL,
	"subscription_id" uuid NOT NULL,
	CONSTRAINT "user_subscriptions_user_id_subscription_id_pk" PRIMARY KEY("user_id","subscription_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text,
	"email" text NOT NULL,
	"avatar" text,
	"balance" integer DEFAULT 0 NOT NULL,
	"payment_link" text,
	"telegram_id" text,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_telegram_id_unique" UNIQUE("telegram_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "telegram_link_tokens" ADD CONSTRAINT "telegram_link_tokens_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
