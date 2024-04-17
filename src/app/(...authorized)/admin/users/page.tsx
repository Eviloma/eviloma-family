import { Title } from "@mantine/core";
import type { Metadata } from "next";
import React from "react";

import UsersList from "@/components/admin/users/UsersList";

const PAGE_TITLE = "Управління користувачами";
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
        Користувачі
      </Title>
      <UsersList />
    </>
  );
}
