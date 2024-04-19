import { Alert } from "@mantine/core";
import dayjs from "dayjs";
import { TriangleAlert } from "lucide-react";

export default function WarningUpdate() {
  const now = dayjs();
  if (now.isAfter(dayjs("2024-04-21"))) {
    return null;
  }
  return (
    <Alert variant="light" color="yellow" title="Увага!" icon={<TriangleAlert />} mb="sm">
      Дані в процесі перенесення. Якщо ви замітили помилки в перенесених даних, будь ласка зверніться до адміністратора.
    </Alert>
  );
}
