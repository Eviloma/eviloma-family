"use client";

import { MenuItem } from "@mantine/core";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { signOut } from "@/utils/logto";

interface IProps {
  iconProps: object;
}

function SignOutMenuItem({ iconProps }: IProps) {
  const router = useRouter();

  const handleClick = async () => {
    const redirectUrl = await signOut();

    router.push(redirectUrl);
  };

  return (
    <MenuItem color="red" onClick={handleClick} leftSection={<LogOut {...iconProps} />}>
      Вийти
    </MenuItem>
  );
}

export default SignOutMenuItem;
