import { relations, sql } from 'drizzle-orm';
import { integer, pgEnum, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { SUBSCRIPTION_CATEGORIES, TRANSACTION_CATEGORIES } from '@/utils/consts';

export const subscriptionCategories = pgEnum('subscription_categories', SUBSCRIPTION_CATEGORIES);
export const transactionCategories = pgEnum('transaction_categories', TRANSACTION_CATEGORIES);

export const users = pgTable('users', {
  id: text('id').primaryKey().unique().notNull(),
  username: text('username'),
  email: text('email').notNull().unique(),
  avatar: text('avatar'),
  balance: integer('balance').default(0).notNull(),
  paymentLink: text('payment_link'),
  telegramID: text('telegram_id').unique(),
  telegramUsername: text('telegram_username'),
  telegramAvatar: text('telegram_avatar'),
});

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
  title: text('title').notNull().unique(),
  category: subscriptionCategories('category').notNull().default('Other'),
  price: integer('price').notNull(),
  date: timestamp('date', { mode: 'date' }).notNull(),
});

export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
  user: text('user')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  title: text('title').notNull(),
  category: transactionCategories('category').notNull().default('Other'),
  suma: integer('suma').notNull(),
  date: timestamp('date', { mode: 'date' }).defaultNow().notNull(),
});

export const telegramLinkTokens = pgTable('telegram_link_tokens', {
  id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
  user: text('user')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .unique(),
  token: text('token').unique().notNull(),
  validUntil: timestamp('valid_until', { mode: 'date' })
    .default(sql`now() + INTERVAL '15 minutes'`)
    .notNull(),
});

export const userOnSubscriptions = pgTable(
  'user_subscriptions',
  {
    userId: text('user_id')
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
      .notNull(),
    subscriptionId: uuid('subscription_id')
      .references(() => subscriptions.id, { onDelete: 'cascade', onUpdate: 'cascade' })
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.subscriptionId] }),
  })
);

export const postOnSubscriptionsRelations = relations(userOnSubscriptions, ({ one }) => ({
  user: one(users, {
    fields: [userOnSubscriptions.userId],
    references: [users.id],
  }),
  subscription: one(subscriptions, {
    fields: [userOnSubscriptions.subscriptionId],
    references: [subscriptions.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  subscriptions: many(userOnSubscriptions),
  transactions: many(transactions),
}));

export const subscriptionRelations = relations(subscriptions, ({ many }) => ({
  users: many(userOnSubscriptions),
}));

export const transactionRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.user],
    references: [users.id],
  }),
}));

export const telegramLinkTokensRelations = relations(telegramLinkTokens, ({ one }) => ({
  user: one(users, {
    fields: [telegramLinkTokens.user],
    references: [users.id],
  }),
}));
