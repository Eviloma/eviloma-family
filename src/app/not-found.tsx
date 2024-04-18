import type { GetServerSideProps } from "next/types";

import BaseErrorPage from "@/components/errorPages/BaseErrorPage";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.statusCode = 404;
  return { props: {} };
};

export default function NotFoundPage() {
  return <BaseErrorPage />;
}
