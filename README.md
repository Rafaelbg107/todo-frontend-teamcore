# Todo Frontend - Hexagonal Architecture

React Todo application built with Hexagonal Architecture.

## 🏗️ Architecture Overview

This project implements **Hexagonal Architecture** to separate business logic from external concerns:

- **Core Domain**: Pure business entities and use cases
- **Ports**: Interfaces defining how the core interacts with external systems
- **Adapters**: Implementations connecting the core to specific technologies (HTTP, LocalStorage, React UI)

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Material-UI (MUI)** - UI components
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Day.js** - Date manipulation
- **Vite** - Build tool and dev server

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **pnpm** package manager
- **Backend API** running on `http://localhost:8000/api` (optional - can use LocalStorage)

## 🚀 Getting Started

### 1. Install Dependencies

Using **npm**:
```bash
npm install
```

Using **pnpm** (recommended):
```bash
pnpm install
```

### 2. Configure Data Source

The application supports two data sources. Choose one by modifying `src/infrastructure/Dependencies.ts`:

#### Option A: HTTP API (Default)
```typescript
const todoRepository = createHttpTodoRepository() // Uses backend API
```

#### Option B: LocalStorage
```typescript
const todoRepository = createLocalStorageTodoRepository() // Uses browser storage
```

### 3. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

### Expected API Endpoints

The HTTP adapter expects these REST endpoints:

- `GET /todos` - Get all todos
- `GET /todos?status=pending|complete` - Get todos by status
- `GET /todos/:id` - Get todo by ID
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo
- `PATCH /todos/:id/complete` - Mark todo as complete
- `PATCH /todos/:id/pending` - Mark todo as pending

## 📝 License

This project is private and proprietary.

---

**Built with ❤️ using Hexagonal Architecture and React**