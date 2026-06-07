# Stack Comparison

## Next.js fullstack

Плюсы:
- Быстрее всего для MVP: frontend, API routes/server actions и деплой в одном проекте.
- Хорошо подходит для Telegram Mini App как web-приложения.
- Удобно делать SSR/metadata, хотя для Mini App это не критично.
- Легко подключить Prisma/Postgres, auth-проверку Telegram initData и mock-payment.

Минусы:
- Если backend быстро станет сложным, API-слой может стать тесным.
- Нужно дисциплинированно разделять frontend, server logic и database access.

## React + Vite + Node API

Плюсы:
- Чистое разделение frontend и backend.
- Vite очень быстрый для UI-прототипирования.
- Backend можно писать на Express/Fastify без привязки к Next.

Минусы:
- Два приложения, два деплоя, больше настройки.
- Для MVP медленнее, чем fullstack Next.js.

## NestJS отдельно

Плюсы:
- Хорошая архитектура для серьезного backend: модули, DI, guards, pipes.
- Подходит, если с первого дня делаем кабинет студии, сложные брони, webhooks, роли, интеграции.

Минусы:
- Избыточен для первого MVP.
- Больше boilerplate и времени до первого результата.

## Supabase / Firebase / BaaS

Плюсы:
- Быстрый старт с базой, storage, auth-like возможностями.
- Supabase хорошо сочетается с Postgres.
- Можно быстро сделать админские таблицы и хранение фото.

Минусы:
- Telegram auth все равно придется валидировать отдельно.
- У Firebase хуже ощущается транзакционная модель бронирований.
- Есть риск vendor lock-in и ограничений по бизнес-логике.

## Рекомендация

Стартовать с `Next.js + TypeScript + Postgres + Prisma`.

Для базы на MVP можно взять Supabase Postgres или локальный/облачный Postgres. Supabase использовать как managed Postgres + storage, но бизнес-логику держать в коде, а не превращать проект в чистый BaaS.

Если backend станет тяжелее, выделим `apps/api` в NestJS позже.
