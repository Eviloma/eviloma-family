"use client";

import type { UserInfoResponse } from "@logto/node";
import { Avatar, Button, Card, CopyButton, Flex, GridCol, Stack, Text } from "@mantine/core";
import { Clipboard, ClipboardCheck, UserRound } from "lucide-react";

import CardTitle from "./items/CardTitle";

interface IProps {
  userInfo: UserInfoResponse;
}

export default function ProfileCard({ userInfo }: IProps) {
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
          <CardTitle icon={<UserRound />} title="Профіль" />
        </Card.Section>

        <Stack gap="md" mt="md" justify="space-between" h="100%">
          <Flex
            direction={{
              base: "column",
              xs: "row",
            }}
            gap="sm"
            align="center"
            justify="center"
            h="100%"
          >
            <Avatar src={userInfo.picture} alt="Avatar" size="xl" color="violet" />
            <Stack
              gap="1px"
              py="xs"
              ta={{
                base: "center",
                xs: "start",
              }}
            >
              <Text fw={600} size="xl">
                {userInfo.username}
              </Text>
              <Text c="dimmed">{userInfo.sub}</Text>
              <Text c="dimmed">{userInfo.email}</Text>
            </Stack>
          </Flex>

          <Stack gap="sm" mt="md">
            <CopyButton value={userInfo.sub}>
              {({ copied, copy }) => (
                <Button
                  color={copied ? "teal" : ""}
                  leftSection={copied ? <ClipboardCheck /> : <Clipboard />}
                  variant="light"
                  onClick={copy}
                >
                  {copied ? "ID скопійовано" : "Скопіювати ID"}
                </Button>
              )}
            </CopyButton>
          </Stack>
        </Stack>
      </Card>
    </GridCol>
  );
}
