import { Title } from "@mantine/core";
import type { Metadata } from "next/types";

import UserTransactions from "@/components/UserTransactions";

const PAGE_TITLE = "Транзакції";
export const metadata: Metadata = {
  title: PAGE_TITLE,
  openGraph: {
    title: PAGE_TITLE,
  },
};

export default function Page() {
  return (
    <>
      <Title ta="center" mb="md">
        Транзакції
      </Title>
      <UserTransactions />
    </>
  );
}
