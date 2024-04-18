import { Box, Flex, Group, NumberFormatter, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

import CategoryIcon from "@/components/CategoryIcon";
import type Subscription from "@/types/subscription";

interface IProps {
  subscription: Subscription;
}

export default function SubscriptionItem({ subscription }: IProps) {
  return (
    <Flex gap="xs" direction={{ base: "column", xs: "row" }} justify={{ xs: "space-between" }} align={{ xs: "center" }}>
      <Group gap="sm" align="center" wrap="nowrap" className="overflow-x-hidden">
        <CategoryIcon category={subscription.category} />
        <Stack gap="2px" justify="space-around" w="100%">
          <Title order={3} size="h4">
            {subscription.title}
          </Title>
          <Box w={{ base: "92%", xs: "100%" }}>
            <Text size="xs" c="dimmed" truncate="end">
              Наступна оплата: {dayjs().to(dayjs(subscription.date).set("hours", 12))}
            </Text>
          </Box>
        </Stack>
      </Group>
      <Text fw={500} size="lg" ta="end">
        <NumberFormatter
          value={subscription.price / 100}
          suffix=" ₴/міс"
          thousandSeparator=" "
          decimalScale={2}
          fixedDecimalScale
        />
      </Text>
    </Flex>
  );
}
