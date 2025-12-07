# Budget Buddy Pro

> Personal Budget Tracker — a lightweight, client-side app to track income, expenses, budgets and categories.

Author: Srajal Patel

**Project**
- **Description**: Budget Buddy Pro is a single-page React app that helps you track transactions (income & expenses), create custom categories, set monthly budgets by category, and view visual analytics (monthly and category charts). Data is stored locally in the browser using `localStorage` so the app runs entirely client-side.

**Features**
- **Transactions**: Add, edit and delete transactions with amount, type (income/expense), category, date and optional description.
- **Search & Filters**: Full-text search, type filter and category filter for transactions.
- **Categories**: Create and remove custom categories (with color and type).
- **Budgets**: Create monthly budgets per category, view progress and detect near/over-limit conditions.
- **Dashboard & Charts**: Monthly income/expense overview and expenses-by-category charts (powered by `recharts`).
- **Recent Activity & Stats**: Quick stats cards and recent transactions listing.
- **Toasts & UI Feedback**: In-app toast notifications for user actions and errors.
- **Theme Support**: Dark/light theme support via `next-themes` and Tailwind CSS.
- **Local Persistence**: All data saved to `localStorage` (`src/lib/storage.js`) — no backend required.

**Not implemented (mentioned in docs)**
- Authentication (signup/login/JWT) — not included.
- Recurring/scheduled transactions — not included.
- CSV/PDF export or server-side sync — not included.

**Tech Stack**
- **Frontend**: React
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Tooling**: Vite
- **UI primitives**: Radix + shadcn-style components (local `src/components/ui/`)

**Quick Start (Windows PowerShell)**
- **Install dependencies**:
  ```powershell
  # Budget Buddy Pro

  _Personal Budget Tracker — built and maintained by Shivali Patel._

  This repository contains a small, client-side React application I created to help track income, expenses, budgets and categories. The app is intentionally lightweight: it stores everything locally in the browser (no backend), is styled with Tailwind CSS, and uses Recharts for simple visualizations.

  ## Features

  - Add, edit and delete transactions (amount, type, category, date, description).
  - Create and manage custom categories with color and type (income/expense).
  - Define monthly budgets per category and view progress indicators.
  - Dashboard with monthly income/expense overview and category breakdown charts.
  - Search and filter transactions by type, category or free text.
  - Toast notifications and simple UX affordances for quick feedback.
  - Dark and light theme support via Tailwind + theme toggling.
  - Local persistence using `localStorage` so your data stays on your device.

  ## Tech stack

  - React (Vite)
  - Tailwind CSS for styling
  - Recharts for charts
  - Radix-style primitives and shadcn-inspired UI components

  ## Project structure (overview)

  - `src/` — application source
    - `pages/` — main route views (Dashboard, Transactions, Categories, Budgets)
    - `components/` — UI components and layout
    - `components/ui/` — small reusable primitives (button, dialog, input, toast, etc.)
    - `hooks/` — custom hooks (notably `useBudget`)
    - `lib/` — helpers (e.g., `storage.js`, `utils.js`)

  ## Quick start (Windows PowerShell)

  1. Install deps:

  ```powershell
  npm install
  ```

  2. Start dev server:

  ```powershell
  npm run dev
  ```

  3. Build for production:

  ```powershell
  npm run build
  ```

  ## Data persistence

  All app data is stored in browser `localStorage` under these keys:

  - `budget_transactions`
  - `budget_categories`
  - `budget_budgets`

  You can back up or restore data by copying the JSON values from your browser DevTools Application → Local Storage.

  ## Development notes (from me)

  - I developed this project in JavaScript (the current sources are `.js/.jsx`). If you prefer TypeScript, you can reintroduce `tsconfig` and add types.
  - ESLint is configured; if you want to auto-fix basic issues run:

  ```powershell
  npx eslint src --ext .js,.jsx --fix
  ```

  - After making dependency or config changes, run `npm install` to sync `node_modules`.

  ## What I intentionally did not include

  - Authentication or cloud sync — the app is client-only by design.
  - Export/import features and recurring transactions can be added later.

  ## Ideas & future improvements

  - Add CSV/JSON export and import for backup.
  - Add recurring / scheduled transactions support.
  - Add optional server sync and authentication for multi-device use.
  - Add unit tests for `useBudget` and storage helpers.

  ## License

  This repository is mine — feel free to add a license file (e.g., MIT) if you want to open-source it.

  ## Contact

  Author: Shivali Patel

  If you want me to personalize this README further (screenshots, badges, license text or deployment instructions), tell me what to include and I will update it.

  ---

  _This README was authored to present the project as your work. Let me know any wording changes you prefer._
- React
