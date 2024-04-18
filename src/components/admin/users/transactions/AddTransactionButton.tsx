"use client";

import "dayjs/locale/uk";

import {
  Button,
  Combobox,
  ComboboxChevron,
  Drawer,
  Group,
  InputBase,
  NumberInput,
  ScrollArea,
  Stack,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { map } from "lodash";
import { Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { TRANSACTION_CATEGORIES } from "@/utils/consts";
import QueryRequest from "@/utils/query-request";

import CategorySelectItem from "../../CategoryItem";

const schema = z.object({
  title: z.string().min(3, { message: "Назва підписки не може бути менше 3-х символ" }),
  category: z.enum(TRANSACTION_CATEGORIES),
  date: z
    .date({ required_error: "Оберіть дату платежу", invalid_type_error: "Невірний формат дати платежу" })
    .min(dayjs().subtract(1, "day").toDate(), "Дата повинна бути більшою за поточну"),
  suma: z.number(),
});

interface IProps {
  id: string;
}

export default function AddTransactionButton({ id }: IProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      title: "",
      suma: 0,
      category: TRANSACTION_CATEGORIES[0] as z.infer<typeof schema>["category"],
      date: dayjs().toDate(),
    },
  });

  const { mutate } = useMutation({
    mutationFn: () => QueryRequest({ link: `/api/users/${id}/transactions`, method: "POST", body: form.values }),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      close();
      form.reset();
      queryClient.invalidateQueries({ queryKey: [`user-${id}-transactions`] });
      notifications.show({
        title: "Успішно",
        message: "Успішно створено транзакцію",
      });
    },
    onError(error) {
      notifications.show({
        title: "Помилка під час створення транзакції",
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
        className="z-50"
        opened={opened}
        onClose={close}
        title="Створення транзакції"
        position="right"
        radius="md"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <form onSubmit={form.onSubmit(() => mutate())}>
          <Stack gap="sm">
            <TextInput {...form.getInputProps("title")} label="Заголовок транзакції" withAsterisk />
            <Combobox
              store={combobox}
              onOptionSubmit={(val) => {
                form.setFieldValue("category", val as z.infer<typeof schema>["category"]);
                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <InputBase
                  label="Категорія транзакції"
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
                  {map(TRANSACTION_CATEGORIES, (category) => (
                    <Combobox.Option key={category} value={category}>
                      <CategorySelectItem category={category} />
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
            <Group gap="sm" wrap="nowrap" align="start" grow>
              <NumberInput
                {...form.getInputProps("suma")}
                label="Сума"
                placeholder="50.00"
                withAsterisk
                suffix=" ₴"
                fixedDecimalScale
                decimalScale={2}
                thousandSeparator=" "
                step={0.01}
              />
              <DateTimePicker
                label="Дата"
                minDate={dayjs().toDate()}
                valueFormat="DD MMMM YYYY HH:mm:ss"
                dropdownType="modal"
                locale="uk"
                withSeconds
                {...form.getInputProps("date")}
              />
            </Group>

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
                Створити
              </Button>
            </Group>
          </Stack>
        </form>
      </Drawer>

      <Button
        color="green"
        leftSection={<Plus />}
        onClick={() => {
          open();
          form.setFieldValue("date", dayjs().toDate());
        }}
      >
        Додати
      </Button>
    </>
  );
}
