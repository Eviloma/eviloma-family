import { Alert } from "@mantine/core";
import { CircleX } from "lucide-react";

interface IProps {
  title: string;
  description: string;
}

export default function ErrorAlert({ title, description }: IProps) {
  return (
    <Alert variant="light" color="red" title={title} icon={<CircleX />}>
      {description}
    </Alert>
  );
}
