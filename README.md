# 💡 cocriar-api

### 🧩 A Fastify-based REST API built with TypeScript and Prisma

## 🧪 Technologies

- 🟦 [**TypeScript**](https://www.typescriptlang.org/)
- ⚡ [**Fastify**](https://fastify.dev/)
- 🧬 [**Prisma**](https://www.prisma.io/)
- 📦 [**Zod**](https://zod.dev/)
- 🌿 [**Dotenv**](https://www.npmjs.com/package/dotenv)

### 🧰 Dev Tools

- ⚙️ [**TSX**](https://github.com/esbuild-kit/tsx) — Instant TypeScript execution
- 📦 [**Tsup**](https://tsup.egoist.dev/) — Zero-config bundler
- 🎯 [**Biome**](https://biomejs.dev/) — Formatter and linter
- 🧠 [**TypeScript**](https://www.typescriptlang.org/)
- 🛠️ [**Prisma CLI**](https://www.prisma.io/docs/reference/api-reference/command-reference)

---

## 🚀 Getting started

### ✅ Requirements

- 🔧 [NodeJS](https://nodejs.org/en)
- 🔁 [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)
- 🗄️ [PostgreSQL](https://www.postgresql.org/) or another DB (set via `.env`)

---

### 📥 Clone the application

```bash
git clone https://github.com/lesada/cocriar-api.git
```

### 📦 Install dependencies

```bash
pnpm install
# or
npm install
```

---

### ⚙️ Set up environment variables

Create a `.env` file in the root:

```env
DATABASE_URL="your_database_connection_string"
```

---

### 🗃️ Database setup

```bash
npx prisma generate
npx prisma migrate dev
```

---

### 🧪 Run the app in development mode

```bash
pnpm dev
# or
npm run dev
```

---

### 🏗️ Build for production

```bash
pnpm build
# or
npm run build
```

---

### 🚦 Start the production server

```bash
pnpm start
# or
npm run start
```

---

### 🧹 Format code with Biome

```bash
pnpm lint
# or
npm run lint
```

---

## 🗂️ Suggested project structure

```
cocriar-api/
├── src/
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── build/
├── .env
├── package.json
└── tsconfig.json
```

---

Made with ❤️ by [Lauren](https://github.com/lesada) and [Érica](https://github.com/ericardmatosz);
