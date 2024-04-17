import { noop } from "lodash";

import { env } from "@/env";
import type Subscription from "@/types/subscription";
import type User from "@/types/user";

export default async function sendSubPaymentNotification(user: User, subscription: Subscription) {
  const notificationData = {
    chat_id: user.telegramID,
    text: `✅ <b>ОПЛАТА ПІДПИСКИ</b>\n🔖 Назва підписки: <i>${
      subscription.title
    }</i>\n💰 Сумма щомісячного платежу: <i>${(subscription.price / 100).toFixed(2)} грн.</i>\n💵 Залишок: <i>${(
      (user.balance - subscription.price) /
      100
    ).toFixed(2)} грн.</i>\n\n<i>P.S.  Дякуємо, що користуєтесь нашими послугами🥰</i>`,
    parse_mode: "HTML",
  };

  await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notificationData),
  }).catch(noop);
}
