
# Олимпиада 2024 по Базам Данных


## Стэк

**Клиент:** Next.js(React), TailwindCSS

**Сервер:** Node.js, Typescript

**Хранение данных:** PostgreSQL, Prisma

## Файловая структура

```bash
/app
  /(auth)                # Все, что связано с аутентификацией
    /login
    /register
    /reset-password
  /(dashboard)           # Основная часть приложения
    /admin               # Интерфейс для админов
      /page.tsx
    /user                # Интерфейс для обычных пользователей
      /page.tsx
    /moderator           # Интерфейс для модераторов
      /page.tsx
  /components            # Общие компоненты
    /layout              # Компоненты для макета
    /ui                  # Общие UI компоненты (кнопки, формы и т.д.)
  /lib                   # Логика (например, для работы с ролями)
  /middlewares           # Промежуточные обработчики (например, для проверки ролей)
  /api                   # API routes для работы с базой данных
    /auth
      /route.ts          # API для аутентификации
    /users
      /route.ts          # API для работы с пользователями
/prisma                  # Prisma схема и миграции
  /migrations
  schema.prisma
/public                  # Статика
/styles                  # Tailwind и другие стили
/tailwind.config.js
/types                   # Типы TypeScript (например, для пользователя и ролей)
/utils                   # Утилиты (например, для работы с cookies или сессиями)
.env
```

## Лицензия
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)