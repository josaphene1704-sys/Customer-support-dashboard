# 🎧 Customer Support Dashboard — מסמך אפיון (SPEC)

> **גרסה:** 1.0 &nbsp;|&nbsp; **תאריך:** 26/09/2026 &nbsp;|&nbsp; **סטטוס:** טיוטה לפיתוח
> **סוג פרויקט:** Single Page Application (SPA) — אפליקציית עמוד אחד שרצה בדפדפן

---

## 📑 תוכן עניינים

1. [סקירת הפרויקט](#1-סקירת-הפרויקט)
2. [מטרות המערכת](#2-מטרות-המערכת)
3. [קהל יעד ומשתמשים](#3-קהל-יעד-ומשתמשים)
4. [דרישות פונקציונליות](#4-דרישות-פונקציונליות)
5. [מודל נתונים](#5-מודל-נתונים)
6. [דרישות לא-פונקציונליות](#6-דרישות-לא-פונקציונליות)
7. [טכנולוגיות מומלצות](#7-טכנולוגיות-מומלצות)
8. [ארכיטקטורת רכיבים](#8-ארכיטקטורת-רכיבים)
9. [מבנה קבצי הפרויקט](#9-מבנה-קבצי-הפרויקט)
10. [עיצוב ו-UI](#10-עיצוב-ו-ui)
11. [קריטריוני קבלה (Acceptance Criteria)](#11-קריטריוני-קבלה-acceptance-criteria)
12. [הרחבות עתידיות](#12-הרחבות-עתידיות)

---

## 1. סקירת הפרויקט

**Customer Support Dashboard** הוא לוח בקרה (Dashboard) אינטראקטיבי לצוות שירות לקוחות.
המערכת מרכזת במסך אחד את כל הפניות (Tickets) של הלקוחות, מציגה מדדי ביצוע מרכזיים (KPIs), ומאפשרת לנציגים ולמנהלים לחפש, לסנן ולעדכן סטטוס של פניות — וכן לנתח מגמות באמצעות גרפים שמתעדכנים בזמן אמת.

| פריט | תיאור |
|------|-------|
| **שם המוצר** | Customer Support Dashboard |
| **פלטפורמה** | Web (Desktop + Mobile responsive) |
| **מקור נתונים (MVP)** | נתוני דמה (Mock Data) מקומיים + סימולציה של פניות חדשות |
| **פריסה** | GitHub Pages |
| **שפת ממשק** | אנגלית (עם אפשרות הרחבה לעברית / RTL) |

---

## 2. מטרות המערכת

| # | מטרה | מדד הצלחה |
|---|------|-----------|
| 🎯 1 | **תמונת מצב מיידית** — לראות תוך שניות כמה פניות פתוחות, דחופות ונסגרו | כל ה-KPIs גלויים מעל ה-fold (בלי גלילה) |
| 🎯 2 | **איתור מהיר של פנייה** — חיפוש וסינון יעילים | מציאת פנייה תוך פחות מ-5 שניות |
| 🎯 3 | **ניהול זרימת עבודה** — עדכון סטטוס בלחיצה אחת | עדכון סטטוס ב-2 קליקים לכל היותר |
| 🎯 4 | **קבלת החלטות מבוססת נתונים** — ניתוח מגמות ועומסים | 3 גרפים לפחות שמתעדכנים אוטומטית |
| 🎯 5 | **חוויית משתמש נקייה ומקצועית** | ציון Lighthouse ≥ 90 ב-Performance וב-Accessibility |

---

## 3. קהל יעד ומשתמשים

| תפקיד (Persona) | צרכים עיקריים |
|------------------|----------------|
| 👩‍💻 **נציג/ת שירות (Agent)** | לראות את הפניות שלו/ה, לחפש לקוח, לעדכן סטטוס |
| 👔 **ראש צוות / מנהל (Manager)** | לעקוב אחרי KPIs, לזהות צווארי בקבוק, לנתח עומסים לפי ערוץ ועדיפות |

---

## 4. דרישות פונקציונליות

> סימון עדיפות: **P0** = חובה ל-MVP · **P1** = חשוב · **P2** = נחמד שיהיה

### 4.1 📊 כרטיסי מדדים (KPI Cards)

שורת כרטיסים בראש העמוד. כל כרטיס מציג: **אייקון**, **כותרת**, **ערך מספרי**, **מגמה** (↑/↓ באחוזים לעומת התקופה הקודמת).

| ID | KPI | חישוב | אייקון (Lucide) | עדיפות |
|----|-----|-------|-----------------|--------|
| KPI-1 | **Total Tickets** | סך כל הפניות | `Ticket` | P0 |
| KPI-2 | **Open Tickets** | פניות בסטטוס `open` + `in_progress` | `Inbox` | P0 |
| KPI-3 | **Resolved Today** | פניות שנסגרו היום | `CheckCircle2` | P0 |
| KPI-4 | **Avg. Response Time** | ממוצע `firstResponseAt - createdAt` (בדקות/שעות) | `Clock` | P0 |
| KPI-5 | **Customer Satisfaction (CSAT)** | ממוצע דירוג 1–5 של פניות סגורות, מוצג באחוזים | `Smile` | P1 |
| KPI-6 | **Urgent Tickets** | פניות פתוחות בעדיפות `urgent` | `AlertTriangle` | P1 |

**כללי התנהגות:**
- הערכים מחושבים **דינמית** מתוך רשימת הפניות (לא ערכים קבועים).
- מגמה חיובית בצבע ירוק, שלילית באדום (שימו לב: ב-Response Time ירידה = חיובי).
- ב-Mobile: הכרטיסים נערמים ל-2 עמודות; ב-Desktop: 4–6 עמודות.

---

### 4.2 📋 טבלת פניות (Tickets Table)

טבלה מרכזית שמציגה את כל הפניות.

#### עמודות

| עמודה | שדה | הערות |
|-------|-----|-------|
| ID | `id` | פורמט `#TCK-1024` |
| Customer | `customer.name` + `customer.email` | שם + אימייל בשורה משנית |
| Subject | `subject` | קיצור טקסט ארוך (`truncate`) |
| Channel | `channel` | אייקון: Email / Phone / Chat / WhatsApp |
| Priority | `priority` | Badge צבעוני: Low / Medium / High / Urgent |
| Status | `status` | Badge + Dropdown לעדכון (ראו 4.3) |
| Agent | `assignee` | שם הנציג / "Unassigned" |
| Created | `createdAt` | זמן יחסי ("2h ago") + tooltip עם תאריך מלא |

#### 🔍 חיפוש (Search) — P0
- שדה חיפוש חופשי עם אייקון `Search`.
- מחפש ב: `id`, `customer.name`, `customer.email`, `subject`.
- **לא רגיש לאותיות גדולות/קטנות** (case-insensitive).
- **Debounce של 300ms** — החיפוש מתבצע רק אחרי שהמשתמש הפסיק להקליד (חוסך חישובים מיותרים).
- כפתור `X` לניקוי החיפוש.

#### 🎛️ סינון (Filters) — P0
| מסנן | סוג | ערכים |
|------|-----|-------|
| Status | Multi-select / Tabs | All, Open, In Progress, Pending, Resolved, Closed |
| Priority | Select | All, Low, Medium, High, Urgent |
| Channel | Select | All, Email, Phone, Chat, WhatsApp |
| Agent | Select | All + רשימת נציגים |
| Date Range | Select | Today, Last 7 days, Last 30 days, All time (P1) |

- כל המסננים עובדים **יחד** (AND) ובשילוב עם החיפוש.
- כפתור **"Clear filters"** מופיע כשיש מסנן פעיל.
- מונה תוצאות: `Showing 12 of 148 tickets`.

#### ↕️ מיון ועימוד — P1
- מיון לפי לחיצה על כותרת עמודה (Created, Priority, Status) — עולה/יורד.
- עימוד (Pagination): 10 / 25 / 50 שורות לעמוד.

#### מצבים מיוחדים
- **Empty state:** כשאין תוצאות — אייקון + הודעה "No tickets match your filters" + כפתור ניקוי.
- **Loading state:** Skeleton rows בזמן טעינה.

---

### 4.3 🔄 עדכון סטטוס פנייה — P0

**זרימת סטטוסים (Status Workflow):**

```
 ┌──────┐     ┌─────────────┐     ┌─────────┐     ┌──────────┐     ┌────────┐
 │ Open │ ──▶ │ In Progress │ ──▶ │ Pending │ ──▶ │ Resolved │ ──▶ │ Closed │
 └──────┘     └─────────────┘     └─────────┘     └──────────┘     └────────┘
     ▲                                                  │
     └──────────────────── Reopen ──────────────────────┘
```

**דרישות:**
- עדכון ישירות מהטבלה באמצעות **Dropdown** בעמודת Status.
- (P1) לחיצה על שורה פותחת **Drawer / Modal** עם פרטי הפנייה המלאים, כולל שינוי סטטוס, עדיפות ושיוך נציג.
- לאחר עדכון:
  - הטבלה, ה-KPIs והגרפים **מתעדכנים מיידית**.
  - מוצגת הודעת **Toast**: `Ticket #TCK-1024 marked as Resolved`.
  - נשמר `updatedAt`; במעבר ל-`resolved` נשמר `resolvedAt`.
- (P1) **שמירה ב-localStorage** — השינויים נשמרים גם אחרי רענון הדף.
- (P2) אפשרות **Undo** בתוך ה-Toast.

---

### 4.4 📈 גרפים לניתוח נתונים בזמן אמת — P0

| ID | גרף | סוג (Recharts) | נתונים |
|----|-----|----------------|--------|
| CH-1 | **Tickets Over Time** | `AreaChart` / `LineChart` | מספר פניות חדשות מול פניות שנסגרו, לפי יום (7/30 יום אחרונים) |
| CH-2 | **Tickets by Status** | `PieChart` (Donut) | התפלגות לפי סטטוס |
| CH-3 | **Tickets by Channel** | `BarChart` | כמות פניות לפי ערוץ |
| CH-4 | **Agent Performance** (P1) | `BarChart` (horizontal) | פניות שנסגרו לפי נציג |

**"זמן אמת" (Real-time) ב-MVP:**
- **סימולציה:** Hook בשם `useLiveTickets` מוסיף פנייה חדשה אקראית כל **10–15 שניות** (`setInterval`).
- אינדיקטור **"● Live"** מהבהב בכותרת, עם מתג **Pause / Resume**.
- כל הגרפים וה-KPIs נגזרים מאותו State ולכן מתעדכנים אוטומטית.
- כל גרף עטוף ב-`ResponsiveContainer` ומציג **Tooltip** ו-**Legend**.

---

### 4.5 🧭 Layout כללי — P0

- **Sidebar** (ניתן לקיפול): Dashboard, Tickets, Customers, Reports, Settings (רק Dashboard פעיל ב-MVP).
- **Header:** כותרת העמוד, חיפוש גלובלי, אינדיקטור Live, פעמון התראות, אווטאר משתמש.
- (P1) **Dark Mode** — מתג בהדר.

---

## 5. מודל נתונים

```ts
type TicketStatus   = 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
type TicketChannel  = 'email' | 'phone' | 'chat' | 'whatsapp';

interface Customer {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface Ticket {
  id: string;                 // "TCK-1024"
  subject: string;
  description: string;
  customer: Customer;
  channel: TicketChannel;
  priority: TicketPriority;
  status: TicketStatus;
  assignee: string | null;    // agent name
  createdAt: string;          // ISO date
  updatedAt: string;
  firstResponseAt?: string;
  resolvedAt?: string;
  satisfaction?: 1 | 2 | 3 | 4 | 5;
}
```

**נתוני דמה:** קובץ `mockTickets.js` עם **~150 פניות** מפוזרות על פני 30 הימים האחרונים, 5–6 נציגים, והתפלגות מציאותית של סטטוסים וערוצים.

---

## 6. דרישות לא-פונקציונליות

| קטגוריה | דרישה |
|---------|-------|
| ⚡ **ביצועים** | טעינה ראשונית < 2 שניות; שימוש ב-`useMemo` לחישובי KPIs וסינון |
| 📱 **Responsive** | תמיכה מ-360px (מובייל) ועד 1920px (דסקטופ) |
| ♿ **נגישות** | ניגודיות צבעים AA, ניווט מקלדת, `aria-label` לכפתורי אייקון |
| 🌐 **דפדפנים** | Chrome, Edge, Firefox, Safari — 2 גרסאות אחרונות |
| 🧹 **איכות קוד** | ESLint + Prettier, רכיבים קטנים וממוקדים, ללא שגיאות Console |
| 🚀 **פריסה** | Build סטטי שעולה ל-GitHub Pages |

---

## 7. טכנולוגיות מומלצות

| טכנולוגיה | תפקיד | למה? |
|-----------|-------|------|
| ⚛️ **React 18+** | ספריית UI מבוססת רכיבים | סטנדרט בתעשייה, קהילה ענקית |
| ⚡ **Vite** | כלי Build ושרת פיתוח | מהיר מאוד, הגדרה פשוטה, מתאים ל-GitHub Pages |
| 🎨 **Tailwind CSS** | עיצוב באמצעות מחלקות מוכנות (utility classes) | עיצוב מהיר ועקבי בלי לכתוב קבצי CSS ארוכים |
| ✨ **Lucide React** | ספריית אייקונים | אייקונים נקיים, קלים, עקביים |
| 📊 **Recharts** | גרפים | מבוסס React, פשוט לשימוש, Responsive |
| 🕒 **date-fns** *(אופציונלי)* | עבודה עם תאריכים | פורמט "2h ago" וחישובי טווחי תאריכים |
| 🔔 **react-hot-toast** *(אופציונלי)* | הודעות Toast | קל ופשוט |

**פקודות התקנה:**

```bash
npm create vite@latest support-dashboard -- --template react
cd support-dashboard
npm install
npm install lucide-react recharts date-fns react-hot-toast
npm install -D tailwindcss @tailwindcss/vite
```

---

## 8. ארכיטקטורת רכיבים

### 8.1 עץ רכיבים (Component Tree)

```
<App>
 ├── <Layout>
 │    ├── <Sidebar />
 │    └── <Header>
 │         ├── <GlobalSearch />
 │         ├── <LiveIndicator />        ← Pause / Resume
 │         └── <ThemeToggle />
 │
 └── <DashboardPage>
      ├── <KpiGrid>
      │    └── <KpiCard /> × 6
      │
      ├── <ChartsSection>
      │    ├── <TicketsOverTimeChart />
      │    ├── <StatusDistributionChart />
      │    ├── <ChannelBarChart />
      │    └── <AgentPerformanceChart />
      │
      └── <TicketsSection>
           ├── <TicketFilters>
           │    ├── <SearchInput />
           │    └── <FilterSelect /> × 4
           ├── <TicketsTable>
           │    └── <TicketRow>
           │         ├── <PriorityBadge />
           │         ├── <ChannelIcon />
           │         └── <StatusSelect />   ← עדכון סטטוס
           ├── <Pagination />
           ├── <EmptyState />
           └── <TicketDrawer />             ← פרטי פנייה (P1)
```

### 8.2 ניהול State (מצב האפליקציה)

> **State** = הנתונים שהאפליקציה "זוכרת" כרגע ומציגה על המסך.

- **מקור אמת יחיד:** `TicketsContext` (React Context + `useReducer`) מחזיק את רשימת הפניות.
- **Actions:** `ADD_TICKET`, `UPDATE_STATUS`, `UPDATE_TICKET`, `RESET`.
- **נתונים נגזרים** (KPIs, נתוני גרפים, רשימה מסוננת) מחושבים ב-`useMemo` — **לא** נשמרים כ-State נפרד.
- **State מקומי** של מסננים וחיפוש נמצא ב-`TicketsSection`.

### 8.3 זרימת נתונים

```
 mockTickets.js ──▶ TicketsContext (useReducer) ◀── useLiveTickets (interval)
                          │                  ▲
          ┌───────────────┼───────────────┐  │
          ▼               ▼               ▼  │
      KpiGrid       ChartsSection   TicketsTable ──(UPDATE_STATUS)──┘
                                          │
                                   localStorage (persist)
```

### 8.4 Custom Hooks

| Hook | תפקיד |
|------|-------|
| `useTickets()` | גישה ל-Context: `tickets`, `updateStatus`, `addTicket` |
| `useLiveTickets(enabled)` | סימולציית פניות חדשות בזמן אמת |
| `useTicketFilters(tickets)` | מחזיר רשימה מסוננת + ממוינת + פונקציות לעדכון מסננים |
| `useKpis(tickets)` | חישוב כל ערכי ה-KPIs והמגמות |
| `useDebounce(value, delay)` | השהיית ערך החיפוש |
| `useLocalStorage(key, initial)` | שמירת State בדפדפן |

---

## 9. מבנה קבצי הפרויקט

```
support-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Header.jsx
│   │   ├── kpi/
│   │   │   ├── KpiGrid.jsx
│   │   │   └── KpiCard.jsx
│   │   ├── charts/
│   │   │   ├── ChartsSection.jsx
│   │   │   ├── ChartCard.jsx
│   │   │   ├── TicketsOverTimeChart.jsx
│   │   │   ├── StatusDistributionChart.jsx
│   │   │   ├── ChannelBarChart.jsx
│   │   │   └── AgentPerformanceChart.jsx
│   │   ├── tickets/
│   │   │   ├── TicketsSection.jsx
│   │   │   ├── TicketFilters.jsx
│   │   │   ├── TicketsTable.jsx
│   │   │   ├── TicketRow.jsx
│   │   │   ├── StatusSelect.jsx
│   │   │   ├── TicketDrawer.jsx
│   │   │   └── Pagination.jsx
│   │   └── ui/
│   │       ├── Badge.jsx
│   │       ├── PriorityBadge.jsx
│   │       ├── ChannelIcon.jsx
│   │       ├── SearchInput.jsx
│   │       ├── FilterSelect.jsx
│   │       ├── EmptyState.jsx
│   │       └── LiveIndicator.jsx
│   ├── context/
│   │   └── TicketsContext.jsx
│   ├── hooks/
│   │   ├── useTickets.js
│   │   ├── useLiveTickets.js
│   │   ├── useTicketFilters.js
│   │   ├── useKpis.js
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   ├── data/
│   │   ├── mockTickets.js
│   │   └── generateTicket.js
│   ├── utils/
│   │   ├── constants.js        ← statuses, priorities, colors
│   │   ├── formatters.js       ← dates, durations, numbers
│   │   └── chartData.js        ← transform tickets → chart series
│   ├── pages/
│   │   └── DashboardPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               ← Tailwind import
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Pages deployment
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

---

## 10. עיצוב ו-UI

### 10.1 פלטת צבעים

| שימוש | Tailwind class | דוגמה |
|-------|----------------|-------|
| Primary | `indigo-600` | כפתורים, קישורים, גרף ראשי |
| Background | `slate-50` / `slate-900` (dark) | רקע כללי |
| Surface | `white` / `slate-800` (dark) | כרטיסים וטבלה |
| Text | `slate-900` / `slate-500` | טקסט ראשי / משני |

### 10.2 צבעי סטטוס ועדיפות

| Status | צבע | | Priority | צבע |
|--------|-----|---|----------|-----|
| Open | `blue` | | Low | `slate` |
| In Progress | `amber` | | Medium | `sky` |
| Pending | `violet` | | High | `orange` |
| Resolved | `emerald` | | Urgent | `red` |
| Closed | `slate` | | | |

### 10.3 עקרונות עיצוב
- כרטיסים: `rounded-2xl`, `shadow-sm`, `border border-slate-200`.
- ריווח עקבי: `gap-4` / `gap-6`, `p-4` / `p-6`.
- טיפוגרפיה: פונט `Inter`, כותרות `font-semibold`.
- מעברים עדינים: `transition-colors`, `hover:bg-slate-50`.

---

## 11. קריטריוני קבלה (Acceptance Criteria)

- [ ] כל 6 כרטיסי ה-KPI מוצגים ומחושבים מתוך הנתונים.
- [ ] חיפוש לפי שם לקוח / אימייל / מספר פנייה / נושא עובד ולא רגיש לאותיות.
- [ ] כל המסננים עובדים יחד ובשילוב עם החיפוש.
- [ ] שינוי סטטוס בטבלה מעדכן מיידית את ה-KPIs והגרפים ומציג Toast.
- [ ] 3 גרפים לפחות מוצגים ומתעדכנים כשנוספת פנייה חדשה.
- [ ] אינדיקטור Live פועל וניתן לעצור/להפעיל את הסימולציה.
- [ ] Empty state מוצג כשאין תוצאות.
- [ ] האתר תקין ב-Mobile (360px) וב-Desktop.
- [ ] אין שגיאות ב-Console.
- [ ] האתר פרוס וזמין בכתובת GitHub Pages.

---

## 12. הרחבות עתידיות

| שלב | תכונה |
|-----|-------|
| v1.1 | Backend אמיתי (למשל **Convex**) עם עדכונים בזמן אמת בין משתמשים |
| v1.2 | התחברות משתמשים והרשאות (Agent / Manager) |
| v1.3 | תגובות והיסטוריית שיחה בתוך כל פנייה |
| v1.4 | ייצוא דוחות ל-CSV / PDF |
| v1.5 | תמיכה מלאה בעברית ו-RTL |
| v2.0 | חיבור לערוצים אמיתיים: WhatsApp Business, Email, צ'אט באתר |

---

<p align="center"><sub>📄 SPEC.MD — Customer Support Dashboard · Aido Academy · Task 3</sub></p>
