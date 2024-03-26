import { noop } from 'lodash';

import User from '@/types/user';

export default async function sendDepositNotification(user: User, suma: number) {
  const notificationData = {
    chat_id: user.telegramID,
    text: `Ваш баланс поповнено на ${(suma / 100).toFixed(2)} грн!☺️`,
  };

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notificationData),
  }).catch(noop);
}
