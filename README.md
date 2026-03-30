# FL App

Лендинг студии: React, Vite, TypeScript, Tailwind, Framer Motion.

## Разработка

```bash
cd website
npm install
npm run dev
```

## Сборка

```bash
cd website
npm run build
```

Статика и ассеты кейсов: `website/public/`.

## Деплой на Vercel

Репозиторий с приложением в папке `website/`. В корне есть `package.json` со скриптом `build` и `vercel.json` с `outputDirectory: website/dist`.

1. Импортируй репозиторий в [Vercel](https://vercel.com/new).
2. **Root Directory оставь пустым (корень репо)** — сборка: `npm run build`, вывод: `website/dist` (подхватится из `vercel.json`).
3. Если в настройках проекта задашь **Root Directory = `website`**, тогда Output = `dist`, а корневой `vercel.json` с `outputDirectory` может конфликтовать — в этом случае удали или поправь `outputDirectory` в панели на **dist**.

После изменений сделай **Redeploy**.
