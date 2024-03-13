/* eslint-disable sonarjs/no-duplicate-string */

'use client';

import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'next/navigation';

export default function LogtoErrorNotificator() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  switch (error) {
    case 'id_token.invalid_iat': {
      notifications.show({
        title: 'Недійсний ідентифікатор',
        message: 'Можливо ви використали вже недійсний ідентифікатор.',
        color: 'red',
      });
      break;
    }

    case 'id_token.invalid_token': {
      notifications.show({
        title: 'Недійсний ідентифікатор',
        message: 'Можливо ви використали недійсний ідентифікатор.',
        color: 'red',
      });
      break;
    }

    case 'callback_uri_verification.redirect_uri_mismatched': {
      notifications.show({
        title: 'Недійсний URI зворотного виклику',
        message: 'URI зворотного виклику не відповідає URI перенаправлення.',
        color: 'red',
      });
      break;
    }

    case 'callback_uri_verification.error_found': {
      notifications.show({
        title: 'Помилка в URI зворотного виклику',
        message: 'В URI зворотного виклику виявлено помилку',
        color: 'red',
      });
      break;
    }

    case 'callback_uri_verification.missing_state': {
      notifications.show({
        title: 'Помилка в URI зворотного виклику',
        message: 'Відсутній стан в URI зворотного виклику',
        color: 'red',
      });
      break;
    }

    case 'callback_uri_verification.state_mismatched': {
      notifications.show({
        title: 'Помилка в URI зворотного виклику',
        message: 'Невідповідність стану в URI зворотного виклику',
        color: 'red',
      });
      break;
    }
    case 'callback_uri_verification.missing_code': {
      notifications.show({
        title: 'Помилка в URI зворотного виклику',
        message: 'Відсутній код в URI зворотного виклику',
        color: 'red',
      });
      break;
    }
    case 'crypto_subtle_unavailable': {
      notifications.show({
        title: 'Crypto.subtle недоступний',
        message: 'Crypto.subtle недоступний у незахищених контекстах (не HTTPS).',
        color: 'red',
      });
      break;
    }
    case 'unexpected_response_error': {
      notifications.show({
        title: 'Неочікувана помилка.',
        message: 'Неочікувана помилка відповіді від сервера.',
        color: 'red',
      });
      break;
    }

    default:
      break;
  }
  return null;
}
