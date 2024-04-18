import type React from "react";

import WarningUpdate from "@/components/WarningUpdate";
import { getLogtoContext } from "@/utils/logto";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = await getLogtoContext();

  if (!isAuthenticated) {
    return <div>Not authorized</div>;
  }
  return (
    <>
      <WarningUpdate />
      {children}
    </>
  );
}
