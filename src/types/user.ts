import { transactions, users } from '@/db/schema';

import Subscription from './subscription';

type User = typeof users.$inferSelect & {
  email: string;
  username: string | null;
  avatar: string | null;
};

type ExtendedUser = User & {
  subscriptions: { subscription: Subscription }[];
  transactions: (typeof transactions.$inferSelect)[];
};

export default User;
export type { ExtendedUser };
