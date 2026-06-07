# Integrations

## Telegram

- Mini App запускается из бота через кнопку или menu button.
- На frontend подключается Telegram Web App SDK.
- Backend валидирует `initData` через bot token.
- Bot API нужен для уведомлений о брони и сервисных сообщений.

Источник: https://core.telegram.org/bots/webapps

## Yandex Maps

- Для карты используется Yandex Maps JavaScript API v3.
- Для адресов студий желательно подключить Geocoder.
- Поиск организаций не нужен для MVP, если каталог студий ведем в своей базе.

Источники:
- https://yandex.com/maps-api/docs
- https://yandex.com/maps-api/docs/js-api/common/connection/javascript.html
- https://yandex.ru/dev/commercial/doc/en/concepts/jsapi-geocoder

## Payments

На MVP используется `PAYMENT_MODE=mock`.

Mock flow:
1. Пользователь выбирает слот.
2. Приложение создает бронь в статусе `pending_payment`.
3. Экран mock-оплаты показывает сумму и способ оплаты.
4. После нажатия бронь переводится в `paid_mock` или `confirmed`.

Будущие кандидаты:
- ЮKassa
- CloudPayments
- Т-Банк
- Robokassa
