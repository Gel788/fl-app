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

## Домен fl-app.ru

Продакшен-URL и почта заданы в `website/src/site.ts` и в мета-тегах `website/index.html`.

На Vercel: **Settings → Domains** → добавь `fl-app.ru` и `www.fl-app.ru`. У регистратора домена укажи DNS, которые покажет Vercel (обычно A `76.76.21.21` для apex или CNAME на `cname.vercel-dns.com` для поддомена). После проверки включи принудительный **HTTPS**.

## SEO и индексация

В проекте уже есть:

- `public/robots.txt` — разрешена индексация, указан `Sitemap`;
- `public/sitemap.xml` — карта сайта (главная страница);
- в `index.html` — canonical, hreflang, Open Graph, Twitter Card, JSON-LD (Organization, WebSite, WebPage).

**Чтобы поиск быстрее подхватил сайт:**

1. **Google Search Console** — добавь ресурс `https://fl-app.ru`, подтверди домен, в разделе «Файлы Sitemap» укажи `https://fl-app.ru/sitemap.xml`.
2. **Яндекс Вебмастер** — то же: сайт, подтверждение, загрузка `sitemap.xml`.
3. Обновляй в `sitemap.xml` тег `lastmod` при заметных правках контента (или автоматизируй позже в CI).

Соцсети студии можно добавить в JSON-LD в блок `Organization` полем `sameAs` (массив URL профилей).
