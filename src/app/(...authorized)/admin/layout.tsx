import type React from "react";

import isAdmin from "@/utils/is-admin";
import { getLogtoContext } from "@/utils/logto";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { scopes } = await getLogtoContext({ getAccessToken: true });

  if (!isAdmin(scopes)) {
    return <div>Not authorized</div>;
  }
  return <>{children}</>;
}
