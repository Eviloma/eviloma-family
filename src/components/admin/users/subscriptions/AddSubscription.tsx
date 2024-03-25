'use client';

import { Button, Combobox, ComboboxChevron, Group, InputBase, Modal, useCombobox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { filter, find, includes, map } from 'lodash';
import { Plus } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import Subscription from '@/types/subscription';
import QueryRequest from '@/utils/query-request';

import { getCategoryData } from '../../CategoryItem';
import SelectItemWithIcon from '../../SelectItemWithIcon';

interface IProps {
  id: string;
  userSubscriptionIds: string[];
}

export default function AddSubscription({ id, userSubscriptionIds }: IProps) {
  const { data, isLoading: isLoadingSubscriptions } = useQuery<Subscription[]>({
    queryKey: ['subscriptions'],
    queryFn: () =>
      QueryRequest({
        link: '/api/subscriptions',
        method: 'GET',
      }),
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const queryClient = useQueryClient();

  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const subscriptionsList = useMemo(
    () => filter(data, (el) => !includes(userSubscriptionIds, el.id)),
    [data, userSubscriptionIds]
  );
  const selectedSubscription = useMemo(() => find(data, { id: value }), [data, value]);

  const { mutate } = useMutation({
    mutationFn: () => QueryRequest({ link: `/api/users/${id}/subscriptions/${value}`, method: 'PUT', body: {} }),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      close();
      setValue('');
      queryClient.invalidateQueries({ queryKey: [`user-${id}-subscriptions`] });
      notifications.show({
        title: 'Успішно',
        message: 'Успішно додано підписку',
      });
    },
    onError(error) {
      notifications.show({
        title: 'Помилка під час додавання підписки',
        message: error.message,
        color: 'red',
      });
    },
    onSettled() {
      setIsLoading(false);
    },
  });
  return (
    <>
      <Modal opened={opened} onClose={close} title='Додавання підписки'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
        >
          <Combobox
            store={combobox}
            readOnly={isLoadingSubscriptions}
            onOptionSubmit={(val) => {
              setValue(val);
              combobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <InputBase
                label='Підписка'
                component='button'
                type='button'
                pointer
                rightSection={<ComboboxChevron />}
                onClick={() => combobox.toggleDropdown()}
              >
                <SelectItemWithIcon
                  icon={getCategoryData(selectedSubscription?.category ?? 'Other').icon}
                  label={selectedSubscription?.title ?? 'Виберіть підписку'}
                />
              </InputBase>
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options>
                {map(subscriptionsList, (subscriptions) => (
                  <Combobox.Option key={subscriptions.id} value={subscriptions.id}>
                    <SelectItemWithIcon
                      icon={getCategoryData(subscriptions.category).icon}
                      label={subscriptions.title}
                    />
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
          <Group mt='xl' gap='sm' justify='space-between' grow>
            <Button
              color='red'
              loading={isLoading}
              onClick={() => {
                setValue('');
                close();
              }}
            >
              Скасувати
            </Button>
            <Button type='submit' loading={isLoading}>
              Додати
            </Button>
          </Group>
        </form>
      </Modal>

      <Button color='green' leftSection={<Plus />} onClick={open}>
        Додати
      </Button>
    </>
  );
}
