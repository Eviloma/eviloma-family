const SubscriptionCategories = ['Other', 'Youtube', 'Spotify'] as const;
const TransactionCategories = [...SubscriptionCategories, 'Deposit'] as const;

export { SubscriptionCategories, TransactionCategories };
