"use client";

import { Button, Card, GridCol, NumberFormatter, Skeleton, Stack, Text, type TextProps } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Coins, CreditCard } from "lucide-react";

import type { ExtendedUser } from "@/types/user";
import QueryRequest from "@/utils/query-request";

import CardTitle from "./items/CardTitle";

const descriptionProps: TextProps = {
  c: "dimmed",
  size: "sm",
  ta: "center",
};

export default function BalanceCard() {
  const { data, isLoading } = useQuery<ExtendedUser>({
    queryKey: ["user"],
    queryFn: () =>
      QueryRequest({
        link: "/api/user",
      }),
  });

  async function deposit() {
    navigator.clipboard.writeText(data?.id ?? "").then(() => {
      window.open(data?.paymentLink ?? "", "_blank", "noreferrer");
    });
  }

  if (isLoading || !data) {
    return (
      <GridCol
        span={{
          base: 12,
          md: 6,
          lg: 4,
        }}
      >
        <Skeleton radius="md" h="100%" />
      </GridCol>
    );
  }

  return (
    <GridCol
      span={{
        base: 12,
        md: 6,
        lg: 4,
      }}
    >
      <Card shadow="sm" padding="lg" radius="md" h="100%" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <CardTitle icon={<Coins />} title="Баланс" />
        </Card.Section>

        <Stack gap="md" mt="md" justify="space-between" h="100%">
          <Stack gap="sm" my="auto">
            <Text size="36px" ta="center" fw={600} c={data.balance < 0 ? "red" : ""}>
              <NumberFormatter
                suffix=" ₴"
                value={data.balance / 100}
                thousandSeparator=" "
                decimalScale={2}
                fixedDecimalScale
              />
            </Text>

            {data.paymentLink ? (
              <Text {...descriptionProps}>
                Для поповнення балансу натисніть кнопку нижче. Для автоматичного зарахування балансу ви повинні ввести
                свій ID в поле &#34;Коментар&#34;. Якщо ви не введете свій ID, зарахування балансу відбудеться від 5
                хвилин до 72 годин.
              </Text>
            ) : (
              <Text {...descriptionProps}>
                Для вашого рахунку не призначено посилання для оплати, зверніться до адміністратора для налаштування
                посилання.
              </Text>
            )}
          </Stack>

          <Button fullWidth leftSection={<CreditCard />} onClick={deposit} variant="light" disabled={!data.paymentLink}>
            Поповнити баланс
          </Button>
        </Stack>
      </Card>
    </GridCol>
  );
}
