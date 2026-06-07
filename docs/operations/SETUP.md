# Setup Notes

## Локальные переменные

Секреты хранятся в `.env.local`.

Требуемые переменные:

- `TELEGRAM_BOT_TOKEN`
- `YANDEX_MAPS_API_KEY`
- `NEXT_PUBLIC_YANDEX_MAPS_API_KEY`
- `PAYMENT_MODE`
- `PAYMENT_PROVIDER`
- `NEXT_PUBLIC_PAYMENT_PROVIDER`

`.env.local` не должен попадать в git. Публичный шаблон лежит в `.env.example`.

## Внешние сервисы

- Telegram Bot: нужен для запуска Mini App и уведомлений.
- Yandex Maps: нужен для карты, меток и геокодирования.
- Payment provider: пока не подключаем, используем mock.
- Figma MCP: доступен в окружении, подключим к конкретному Figma-файлу после настройки.

## Сервер для деплоя

- Host: `185.73.126.101`
- User: `root`
- Password: хранится только локально в `.env.local` как `DEPLOY_PASSWORD`.

Перед продакшеном лучше перейти на SSH key, отключить password login и не деплоить от `root` напрямую.

## Следующий технический шаг

Скаффолд `apps/web` как Next.js app с TypeScript, затем добавить:

- Telegram Web App SDK bootstrap;
- Yandex Maps loader;
- mock data studios;
- базовый роутинг экранов;
- dark theme под Telegram Mini App.
