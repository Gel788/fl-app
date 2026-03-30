export type CaseMetric = { label: string; value: string }

export type CaseDetail = {
  /** Крупный лид под заголовком */
  lead?: string
  /** Развёрнутое описание */
  summary: string
  /** Роль команды */
  role?: string
  /** Вызовы */
  challenges?: string[]
  /** Решение */
  solution?: string[]
  stack?: string[]
  metrics?: CaseMetric[]
}

export type CaseStudy = {
  id: string
  tag: string
  title: string
  desc: string
  cover: string
  logo?: string
  gallery: string[]
  accent: string
  featured?: boolean
  /** Тексты и блоки для детального просмотра */
  detail?: CaseDetail
}

const base = '/cases'

export const caseStudies: CaseStudy[] = [
  {
    id: 'prodayu-more',
    tag: 'Travel · EdTech',
    title: 'Продаю море',
    desc: 'Туристическая платформа: веб, мобильное приложение и ЭДО между клиентом и туроператором.',
    cover: `${base}/ПродаюМоре/prodayu-cover.png`,
    logo: `${base}/ПродаюМоре/logo-prodayu-more.svg`,
    gallery: [`${base}/ПродаюМоре/prodayu-screen-2.png`],
    accent: 'from-cyan-500/20 to-transparent',
    featured: true,
    detail: {
      lead: 'Комплексная экосистема бронирования и документооборота для туроператора.',
      summary:
        'С нуля спроектировали веб, мобильные клиенты и контур ЭДО: от каталога и оплат до подписания договоров и ваучеров. Фокус — скорость сделки и прозрачность статусов для клиента и оператора.',
      role: 'Продукт, дизайн-система, веб, мобайл, бэкенд, интеграции',
      challenges: [
        'Разные сценарии бронирования и изменения условий без «ручного» трекинга.',
        'Согласование документов между клиентом и туроператором без потери версий.',
      ],
      solution: [
        'Единый профиль клиента и история бронирований на вебе и в приложении.',
        'Модуль ЭДО: шаблоны, статусы, подпись, уведомления и архив по каждой заявке.',
      ],
      stack: ['React', 'React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      metrics: [
        { label: 'Онлайн-брони', value: '+150%' },
        { label: 'Документы', value: '−80% время' },
        { label: 'Конверсия', value: '+65%' },
      ],
    },
  },
  {
    id: 'merimovs',
    tag: 'Недвижимость · PropTech',
    title: 'Merimovs.ru',
    desc: 'Сайт и мобильное приложение агентства недвижимости: каталог объектов, заявки и сопровождение сделки.',
    cover: `${base}/Merimovs/cover.png`,
    gallery: [`${base}/Merimovs/screen-2.png`, `${base}/Merimovs/screen-3.png`],
    accent: 'from-sky-500/20 to-transparent',
    detail: {
      lead: 'Цифровой контур для агентства: единый опыт на вебе и в приложении.',
      summary:
        'Для merimovs.ru спроектировали и реализовали публичный сайт и мобильные клиенты: презентация объектов, удобный поиск и фильтры, заявки и коммуникация с брокером. Учли скорость загрузки карточек, адаптивную вёрстку и сценарии повторных визитов.',
      role: 'Продукт, UI/UX, веб, мобильное приложение',
      challenges: [
        'Согласовать воронку лида на сайте и в приложении без дублирования данных.',
        'Показать объекты и детали так, чтобы пользователь быстро сравнивал варианты.',
      ],
      solution: [
        'Единая логика каталога и карточки объекта на вебе и в мобайле.',
        'Формы заявок и уведомления, понятные статусы обращения для клиента.',
      ],
      stack: ['React', 'React Native', 'TypeScript', 'Node.js'],
    },
  },
  {
    id: 'amadent',
    tag: 'Medtech · CRM',
    title: 'Амадент М360',
    desc: 'CRM для медцентра и стоматологии: записи, медкарты, финансы и аналитика клиники.',
    cover: `${base}/Амадент М/1uhuGO.jpg`,
    logo: `${base}/AmadentM/logo-amadent.svg`,
    gallery: [
      `${base}/Амадент М/photo.png`,
      `${base}/Амадент М/1uhuGO.jpg`,
      `${base}/Амадент М/crm-zadachi-i-zvonki(1).jpeg`,
    ],
    accent: 'from-rose-500/15 to-transparent',
    detail: {
      summary:
        'Специализированная CRM под расписание врачей, медкарты и финансы. Учли конфиденциальность данных и сценарии работы регистратуры и администрации.',
      stack: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'TypeScript', 'Docker', 'AWS'],
      metrics: [
        { label: 'Записи', value: '+50%' },
        { label: 'Эффективность', value: '+35%' },
      ],
    },
  },
  {
    id: 'webench',
    tag: 'B2B · Analytics',
    title: 'WeBench',
    desc: 'Платформа бенчмаркинга и аналитики операционных данных для промышленности (DE).',
    cover: `${base}/WeBench/4.png`,
    logo: `${base}/WeBench/logo-webench.svg`,
    gallery: [`${base}/WeBench/2.png`, `${base}/WeBench/3.png`],
    accent: 'from-violet-500/20 to-transparent',
    detail: {
      summary:
        'Подписочная B2B-платформа для сравнения KPI между компаниями: профили, каталог сервисов, дашборды и тикет-система поддержки. Локализация EN/DE.',
      stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    },
  },
  {
    id: 'astech',
    tag: 'Automotive',
    title: 'Astech',
    desc: 'Облачная платформа для диагностики ТС: VIN, ИИ-отчёты, LPR и интеграции.',
    cover: `${base}/ Astech/image_1.png`,
    logo: `${base}/ Astech/logo-astech.svg`,
    gallery: [`${base}/ Astech/image_2.png`, `${base}/ Astech/image_3.png`],
    accent: 'from-amber-500/20 to-transparent',
    detail: {
      summary:
        'Микросервисная платформа: VIN-декодер, отчёты диагностики с ИИ, LPR и админка. Интеграции с внешними базами и биллингом.',
      stack: ['TypeScript', 'Node.js', 'AWS', 'Kubernetes', 'Stripe', 'Pusher'],
    },
  },
  {
    id: 'womansy',
    tag: 'Health · Femtech',
    title: 'Womansy',
    desc: 'Мобильный трекер женского здоровья: цикл, контент и забота о самочувствии.',
    cover: `${base}/Womansy/18.jpg`,
    logo: `${base}/Womansy/logo-womansy.svg`,
    gallery: [`${base}/Womansy/19.jpg`],
    accent: 'from-pink-500/15 to-transparent',
    detail: {
      summary:
        'Мобильное приложение с трекингом цикла, контентом и приватностью данных. Уделили внимание UX быстрых вводов и спокойной визуальной подаче.',
      stack: ['React Native', 'TypeScript'],
    },
  },
  {
    id: 'lighteams',
    tag: 'HR · B2B',
    title: 'LighTeams',
    desc: 'Платформа для проектов и HR: задачи, онбординг, тайм-трекер и база знаний.',
    cover: `${base}/LighTeams/image_2_lighteams.png`,
    logo: `${base}/LighTeams/logo-lighteams.svg`,
    gallery: [
      `${base}/LighTeams/Liquid_Konvertiert.svg_4__0.jpg`,
      `${base}/LighTeams/Liquid_Konvertiert.svg_14.png`,
    ],
    accent: 'from-sky-500/15 to-transparent',
    detail: {
      summary:
        'Внутренний инструмент вырос в B2B-продукт: проекты, HR-заявки, тайм-трекер, база знаний и лента новостей — с гибкими доступами.',
      stack: ['React', 'React Native', 'TypeScript'],
    },
  },
  {
    id: 'fora-bank',
    tag: 'Fintech',
    title: 'Фора Банк',
    desc: 'Мобильный банк: платежи, карты и стабильный UX под высокой нагрузкой.',
    cover: `${base}/ForaBank/fora5-17032020.png`,
    logo: `${base}/ForaBank/logo.svg`,
    gallery: [`${base}/ForaBank/3V2ljQEqjMVQ2ZAJKqYyFSp5U7fixWt2.jpg`],
    accent: 'from-teal-500/25 to-transparent',
    detail: {
      lead: 'Релиз ключевых сценариев мобильного банка: скорость, доступность и предсказуемость интерфейса под нагрузкой.',
      summary:
        'Мы усилили мобильное приложение Фора Банка: прокачали платёжные потоки и экраны карт, сократили лишние шаги в частых операциях и выровняли поведение UI под разные размеры экранов. Параллельно занялись «скелетом» производительности: меньше лишних перерисовок, стабильнее анимации и навигация без рывков.',
      role: 'Мобильная разработка · UI/UX · перформанс',
      challenges: [
        'Пиковые нагрузки в платёжных сценариях и чувствительность к задержкам интерфейса.',
        'Фрагментированная логика экранов после нескольких итераций продуктовых релизов.',
        'Необходимость сохранить привычные паттерны для клиентов и одновременно упростить путь к целевому действию.',
      ],
      solution: [
        'Рефакторинг навигации и состояния: предсказуемые переходы, единые контракты данных между модулями.',
        'Оптимизация списков и тяжёлых экранов: мемоизация, контроль ре-рендеров, профилирование под реальные устройства.',
        'Визуальная дисциплина: сетка, типографика, отступы и состояния загрузки без «мигания» контента.',
        'Набор регрессионных сценариев для платежей и карт перед каждым релизом.',
      ],
      stack: ['React Native', 'TypeScript', 'Redux Toolkit', 'Reanimated', 'Detox', 'Fastlane'],
      metrics: [
        { label: 'Ключевые сценарии', value: '−18% время' },
        { label: 'Стабильность', value: '−38% крэши' },
        { label: 'Оценки в сторе', value: 'рост ↑' },
      ],
    },
  },
  {
    id: 'edo',
    tag: 'Gov · ЭДО',
    title: 'ЭДО · экосистема',
    desc: 'Модуль электронного документооборота: подписи, маршруты, аудит и наблюдаемость.',
    cover: `${base}/Gosuslugi/220.jpg`,
    logo: `${base}/Gosuslugi/logo-edo.svg`,
    gallery: [],
    accent: 'from-emerald-500/15 to-transparent',
    detail: {
      summary:
        'Модуль ЭДО с маршрутизацией по ролям, подписанием, аудитом и идемпотентностью операций. Интеграция в существующую экосистему сервисов.',
      stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Kafka', 'OpenAPI'],
      metrics: [{ label: 'Согласования', value: '−29% время' }],
    },
  },
]
