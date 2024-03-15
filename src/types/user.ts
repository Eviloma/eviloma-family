import { transactions, users } from '@/db/schema';

import Subscription from './subscription';

type User = typeof users.$inferSelect & {
  email: string;
  username: string | null;
  avatar: string | null;
  subscriptions: { subscription: Subscription }[];
  transactions: (typeof transactions.$inferSelect)[];
};

export default User;
