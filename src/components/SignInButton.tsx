"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

import { signIn } from "@/utils/logto";

interface IProps {
  label?: string;
}

export default function SignInButton({ label }: IProps) {
  const router = useRouter();

  const handleClick = async () => {
    const redirectUrl = await signIn();

    router.push(redirectUrl);
  };

  return <Button onClick={handleClick}>{label ?? "Увійти"}</Button>;
}
