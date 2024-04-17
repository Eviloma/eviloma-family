import { Alert } from "@mantine/core";
import { TriangleAlert } from "lucide-react";
import React from "react";

export default function WarningUpdate() {
  return (
    <Alert variant="light" color="yellow" title="Увага!" icon={<TriangleAlert />} mb="sm">
      Дані в процесі перенесення. Деякі старі данні можуть не відображатись деякий час.
    </Alert>
  );
}
