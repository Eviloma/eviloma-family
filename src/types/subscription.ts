import type { subscriptions } from "@/db/schema";

type Subscription = typeof subscriptions.$inferSelect;

export default Subscription;
