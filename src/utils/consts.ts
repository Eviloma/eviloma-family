import { StatusCodes } from "http-status-codes";

const SUBSCRIPTION_CATEGORIES = ["Other", "Youtube", "Spotify"] as const;
const TRANSACTION_CATEGORIES = [...SUBSCRIPTION_CATEGORIES, "Deposit"] as const;
const SCOPES = {
  admin: "admin:family",
} as const;
const MAX_RETRY_ATTEMPTS = 3;
const DONT_RETRY_STATUS_CODES = [StatusCodes.TOO_MANY_REQUESTS, StatusCodes.NOT_FOUND];

const META = {
  title: "Eviloma Family",
  title_template: "%s | Eviloma Family",
  description: "Система управління сімейними підписками Eviloma",
};

export { DONT_RETRY_STATUS_CODES, MAX_RETRY_ATTEMPTS, META, SCOPES, SUBSCRIPTION_CATEGORIES, TRANSACTION_CATEGORIES };
