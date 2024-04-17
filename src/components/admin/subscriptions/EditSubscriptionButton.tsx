"use client";

import "dayjs/locale/uk";

import {
  ActionIcon,
  Button,
  Combobox,
  ComboboxChevron,
  Drawer,
  Flex,
  Group,
  InputBase,
  NumberInput,
  ScrollArea,
  Stack,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { map } from "lodash";
import { PencilRuler } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";

import type Subscription from "@/types/subscription";
import { SUBSCRIPTION_CATEGORIES } from "@/utils/consts";
import QueryRequest from "@/utils/query-request";

import CategorySelectItem from "../CategoryItem";

const schema = z.object({
  title: z.string().min(3, { message: "Назва підписки не може бути менше 3-х символ" }),
  price: z.number().min(0.01, { message: "Ціна підписки не може бути менше 0.01₴" }),
  category: z.enum(SUBSCRIPTION_CATEGORIES),
  date: z
    .date({ required_error: "Оберіть дату платежу", invalid_type_error: "Невірний формат дати платежу" })
    .min(dayjs().subtract(1, "day").toDate(), "Дата повинна бути більшою за поточну"),
});

interface IProps {
  subscription: Subscription;
}

export default function EditSubscriptionButton({ subscription }: IProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      title: subscription.title,
      price: subscription.price / 100,
      category: subscription.category,
      date: dayjs(subscription.date)
        .set("hours", 0)
        .set("minutes", 0)
        .set("seconds", 0)
        .set("milliseconds", 0)
        .toDate(),
    },
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      QueryRequest({ link: `/api/subscriptions/${subscription.id}`, method: "POST", body: form.values }),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      close();
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      notifications.show({
        title: "Успішно",
        message: "Успішно оновлено підписку",
      });
    },
    onError(error) {
      notifications.show({
        title: "Помилка під час оновлення підписки",
        message: error.message,
        color: "red",
      });
    },
    onSettled() {
      setIsLoading(false);
    },
  });
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Оновлення підписки"
        position="right"
        size="md"
        radius="md"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <form onSubmit={form.onSubmit(() => mutate())}>
          <Stack gap="sm">
            <TextInput {...form.getInputProps("title")} label="Назва підписки" withAsterisk />
            <Combobox
              store={combobox}
              onOptionSubmit={(val) => {
                form.setFieldValue("category", val as z.infer<typeof schema>["category"]);
                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <InputBase
                  label="Категорія підписки"
                  component="button"
                  type="button"
                  pointer
                  rightSection={<ComboboxChevron />}
                  onClick={() => combobox.toggleDropdown()}
                >
                  <CategorySelectItem category={form.values.category} />
                </InputBase>
              </Combobox.Target>
              <Combobox.Dropdown>
                <Combobox.Options>
                  {map(SUBSCRIPTION_CATEGORIES, (category) => (
                    <Combobox.Option key={category} value={category}>
                      <CategorySelectItem category={category} />
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
            <Flex
              gap="sm"
              wrap="nowrap"
              align="start"
              direction={{
                base: "column",
                sm: "row",
              }}
            >
              <NumberInput
                {...form.getInputProps("price")}
                label="Ціна підписки"
                placeholder="50.00"
                withAsterisk
                suffix=" ₴"
                fixedDecimalScale
                decimalScale={2}
                thousandSeparator=" "
                step={0.01}
                min={0.01}
                w="100%"
              />
              <DatePickerInput
                label="Наступна дата платежу"
                minDate={dayjs().toDate()}
                valueFormat="DD MMMM YYYY"
                locale="uk"
                w="100%"
                {...form.getInputProps("date")}
              />
            </Flex>

            <Group mt="xl" gap="sm" justify="space-between" grow>
              <Button
                color="red"
                loading={isLoading}
                onClick={() => {
                  form.reset();
                  close();
                }}
              >
                Скасувати
              </Button>
              <Button type="submit" loading={isLoading}>
                Змінити
              </Button>
            </Group>
          </Stack>
        </form>
      </Drawer>

      <ActionIcon color="yellow.5" size="lg" onClick={open}>
        <PencilRuler />
      </ActionIcon>
    </>
  );
}
