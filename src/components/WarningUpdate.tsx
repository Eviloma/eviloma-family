import { Alert } from "@mantine/core";
import dayjs from "dayjs";
import { TriangleAlert } from "lucide-react";

export default function WarningUpdate() {
  const now = dayjs();
  if (now.isAfter(dayjs("2024-09-03"))) {
    return null;
  }
  return (
    <Alert variant="light" color="yellow" title="Увага!" icon={<TriangleAlert />} mb="sm">
      Увага! З 1 вересня 2024 року, підписки Spotify Premium 1st/1stx3/1st 2024/2nd подорожчають на 10/30/10/10 грн відповідно!
    </Alert>
  );
}
