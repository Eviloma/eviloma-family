import { subscriptions, transactions, users } from '@/db/schema';

type User = typeof users.$inferSelect & {
  email: string;
  username: string | null;
  avatar: string | null;
  subscriptions: { subscription: typeof subscriptions.$inferSelect }[];
  transactions: (typeof transactions.$inferSelect)[];
};

export default User;
