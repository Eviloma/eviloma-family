const SUBSCRIPTION_CATEGORIES = ['Other', 'Youtube', 'Spotify'] as const;
const TRANSACTION_CATEGORIES = [...SUBSCRIPTION_CATEGORIES, 'Deposit'] as const;
const SCOPES = {
  admin: 'admin:family',
} as const;

export { SCOPES, SUBSCRIPTION_CATEGORIES, TRANSACTION_CATEGORIES };
