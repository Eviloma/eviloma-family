import { includes } from "lodash";

import { SCOPES } from "./consts";

export default function isAdmin(scopes?: string[]) {
  return includes(scopes, SCOPES.admin);
}
