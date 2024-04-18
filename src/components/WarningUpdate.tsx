import { Alert } from "@mantine/core";
import { TriangleAlert } from "lucide-react";

export default function WarningUpdate() {
  return (
    <Alert variant="light" color="yellow" title="Увага!" icon={<TriangleAlert />} mb="sm">
      Дані в процесі перенесення. Якщо ви замітили помилки в перенесених даних, будь ласка зверніться до адміністратора.
    </Alert>
  );
}
