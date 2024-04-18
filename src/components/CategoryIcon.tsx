import { Box, type MantineColor, type StyleProp } from "@mantine/core";

import type { SUBSCRIPTION_CATEGORIES, TRANSACTION_CATEGORIES } from "@/utils/consts";

import { getCategoryData } from "./admin/CategoryItem";

interface IProps {
  category: (typeof SUBSCRIPTION_CATEGORIES)[number] | (typeof TRANSACTION_CATEGORIES)[number];
  bg?: StyleProp<MantineColor>;
}

export default function CategoryIcon({ category, bg }: IProps) {
  return (
    <Box bg={bg ?? "dark.7"} p="xs" className="flex items-center justify-center rounded-full">
      {getCategoryData(category).icon}
    </Box>
  );
}
