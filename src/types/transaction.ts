import { transactions } from '@/db/schema';

type Transaction = typeof transactions.$inferSelect;

export default Transaction;
