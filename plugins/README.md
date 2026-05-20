# React Base Project

A modern React application built with Clean Architecture principles, leveraging cutting-edge technologies like TanStack Router, TanStack Query, and TypeScript.

## 🏗️ Architecture

This project follows **Clean Architecture** patterns with clearly separated layers:

```
src/
├── application/         # Application Layer
│   ├── dto/            # Data Transfer Objects
│   ├── exceptions/     # Application exceptions
│   ├── repositories/   # Repository interfaces
│   └── services/       # Service interfaces
├── domain/             # Domain Layer
│   └── models/         # Domain models and entities
├── infrastructure/     # Infrastructure Layer
│   ├── hooks/          # Custom API hooks
│   ├── http/           # HTTP client configuration
│   ├── repositories/   # Repository implementations
│   └── services/       # Service implementations
├── presentation/       # Presentation Layer
│   ├── components/     # UI components
│   ├── features/       # Feature-based components
│   ├── hooks/          # Presentation hooks
│   ├── layouts/        # Layout components
│   └── provider/       # Context providers
├── routes/             # TanStack Router routes
└── shared/             # Shared utilities
```

## 🚀 Tech Stack

### Core

- **React 19.0.0** - Modern UI framework
- **TypeScript** - Type safety and enhanced developer experience
- **Vite 6.3.5** - Lightning-fast build tool

### Routing & State Management

- **TanStack Router 1.132.0** - Type-safe routing with file-based routing
- **TanStack Query 5.66.5** - Server state management and intelligent caching

### Styling

- **TailwindCSS 4.0.6** - Utility-first CSS framework

### HTTP & Validation

- **Axios 1.12.2** - HTTP client with interceptors
- **Zod 3.24.2** - TypeScript-first schema validation
- **@t3-oss/env-core 0.12.0** - Type-safe environment variable validation

### Utilities

- **dayjs 1.11.18** - Lightweight date manipulation library

### Internationalization

- **Paraglide.js 2.7.0** - Type-safe internationalization with compile-time message extraction
- **Inlang 3.0.0** - Translation management and workflow

### Development Tools

- **ESLint 9.36.0** - Code linting and quality enforcement
- **Prettier 3.5.3** - Opinionated code formatting
- **Husky 9.1.7** - Git hooks for automation
- **Commitlint 20.0.0** - Conventional commit message validation
- **Vitest 3.0.5** - Fast unit testing framework
- **MSW 2.12.4** - Mock Service Worker for API mocking

## 📦 Installation

### Prerequisites

- **Node.js** >= 16.0.0
- **Yarn 1.22.22**

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-base
   ```

2. **Install dependencies**

   ```bash
   corepack enable
   yarn install
   ```

3. **Environment configuration**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Required
   VITE_APP_API_URL=http://localhost:3001

   # Optional
   VITE_APP_TIMEOUT=30000
   VITE_APP_TITLE=React Base
   VITE_APP_ENABLE_LOGGER=false
   VITE_APP_ENABLE_MSW=false
   VITE_APP_ENVIRONMENT=development
   VITE_APP_VERSION=1.0.0
   SERVER_URL=http://localhost:3001
   ```

   **Note**: Environment variables are validated at runtime using `@t3-oss/env-core` and Zod. Invalid or missing required variables will cause the app to fail at startup.

4. **Start development server**

   ```bash
   yarn dev
   ```

   The application will run at `http://localhost:3000`

## 🎯 Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn start        # Alias for dev

# Build & Deploy
yarn build        # Build for production
yarn build:msw    # Build with MSW enabled
yarn serve        # Preview production build

# Testing
yarn test         # Run tests
yarn test:watch   # Run tests in watch mode

# Code Quality
yarn check:lint   # Check linting issues
yarn check:type   # Check TypeScript errors
yarn check:format # Check code formatting
yarn check        # Run all checks in parallel

yarn fix:lint     # Auto-fix linting issues
yarn fix:format   # Auto-format code
yarn fix          # Run all fixes in parallel

# Code Generation
yarn gen:api              # Generate CRUD API utilities

# Internationalization
yarn i18n:gen             # Generate i18n messages (runs automatically on install)
yarn machine-translate    # Machine translate messages using Inlang
```

## 🔧 Key Features

### 1. Authentication System

- JWT-based login/logout
- Social authentication (Google, Facebook)
- Password management (forgot, reset, change)
- User registration with email confirmation
- Automatic token refresh
- Protected routes with role-based access control

### 2. HTTP Client

- Axios instance with interceptors
- Automatic token handling
- Request/Response logging
- Advanced error handling and retry logic
- Request cancellation support

### 3. API Layer

- Type-safe API calls with TanStack Query
- Generic hooks for CRUD operations
- Error boundaries and loading states
- Intelligent caching and background updates
- Multipart form data upload support

### 4. Routing System

- File-based routing with TanStack Router
- Type-safe navigation and parameters
- Route guards and authentication middleware
- Error boundaries for each route
- Automatic code splitting

### 5. Internationalization (i18n)

- Type-safe translations with Paraglide.js
- Compile-time message extraction
- URL localization support (e.g., `/en/dashboard`, `/de/dashboard`)
- Multi-language support (English, German, and more)
- Translation management with Inlang
- Automatic message generation on install

### 6. Development Experience

- Hot module replacement with Vite
- TypeScript strict mode
- Path aliases for clean imports:
  - `@/` → `src/`
  - `@paraglide/` → `src/paraglide/`
  - `@shared/` → `src/shared/`
  - `@application/` → `src/application/`
  - `@domain/` → `src/domain/`
  - `@infrastructure/` → `src/infrastructure/`
  - `@presentation/` → `src/presentation/`
- Auto-generated route tree
- Integrated DevTools (React DevTools, TanStack DevTools)
- Environment variable validation with type safety
- Automatic feature file content generation

## 📁 Detailed Folder Structure

### Application Layer

```
application/
├── dto/
│   └── response/       # Response DTOs
├── exceptions/         # Business exceptions
├── repositories/       # Repository interfaces
└── services/          # Service interfaces
```

### Domain Layer

```
domain/
└── models/            # Domain entities and models
    ├── Auth.ts        # Authentication models
    ├── Users.ts       # User management models
    └── common/        # Common models
```

### Infrastructure Layer

```
infrastructure/
├── hooks/             # API-related hooks
├── http/              # HTTP client setup
├── repositories/      # Repository implementations
└── services/          # Service implementations
```

### Presentation Layer

```
presentation/
├── components/        # Reusable UI components
├── features/          # Feature-specific components
│   ├── auth/         # Authentication features
│   ├── dashboard/    # Dashboard features
│   └── errors/       # Error pages
├── hooks/            # Presentation hooks
│   ├── auth/        # Auth-related hooks
│   └── users/       # User management hooks
├── layouts/          # Layout components
└── provider/         # Context providers
```

## 🔐 Environment Variables

Environment variables are validated using `@t3-oss/env-core` and Zod. All client-side variables must be prefixed with `VITE_`.

### Required Variables

```env
VITE_APP_API_URL=http://localhost:3001
```

### Optional Variables

```env
# API Configuration
VITE_APP_TIMEOUT=30000                    # Request timeout in milliseconds (default: 30000)

# App Configuration
VITE_APP_TITLE=React Base Project         # Application title
VITE_APP_ENVIRONMENT=development          # Environment: development | staging | production
VITE_APP_VERSION=1.0.0                    # Application version

# Development Configuration
VITE_APP_ENABLE_LOGGER=false             # Enable request/response logging (default: false)
VITE_APP_ENABLE_MSW=false                # Enable Mock Service Worker (default: false)

# Server Configuration (server-side only)
SERVER_URL=http://localhost:3001          # Server URL (optional)
```

### Environment Variable Validation

The project uses `@t3-oss/env-core` for type-safe environment variable validation:

- Invalid or missing required variables will cause the app to fail at startup
- Type checking is enforced at both compile-time and runtime
- Empty strings are treated as undefined (allowing defaults to apply)

### Mock API (MSW)

This project uses **Mock Service Worker (MSW)** to simulate the backend API in development.

- **Enable MSW in development**

  MSW is only started in development mode and is controlled by the `VITE_APP_ENABLE_MSW` environment variable:

  ```env
  # Enable mock API (development only)
  VITE_APP_ENABLE_MSW=true
  ```

  When all of the following are true, the mock API will be used:
  - `import.meta.env.DEV === true` (running `yarn dev`)
  - `VITE_APP_ENABLE_MSW === 'true'`

  The worker is started in `main.tsx` via:

  ```ts
  enableMocking().then(() => {
    // render app...
  })
  ```

- **Base URL for mocked endpoints**

  All mocked endpoints use the same base URL as your real API:

  ```env
  VITE_APP_API_URL=http://localhost:3001
  ```

  Handlers in `src/mocks/handlers.ts` build URLs using this value, for example:
  - `POST ${VITE_APP_API_URL}/auth/login`
  - `GET ${VITE_APP_API_URL}/auth/me`
  - `POST ${VITE_APP_API_URL}/auth/logout`

- **Mocked authentication responses**

  The mock handlers currently provide:
  - **Login (`POST /auth/login`)**: returns a fixed user and tokens:
    - `token`: `mock-token`
    - `refreshToken`: `mock-refresh-token`
    - `isPasswordChangeRequired`: `false`
    - `user`: basic user profile (id, email, name, role)
  - **Me (`GET /auth/me`)**: returns the same mock user profile
  - **Logout (`POST /auth/logout`)**: returns `{ result: true }`

- **Switching between mock API and real backend**
  - Use **mock API** (no backend required):

    ```env
    VITE_APP_ENABLE_MSW=true
    ```

  - Use **real backend**:

    ```env
    VITE_APP_ENABLE_MSW=false
    ```

  Unhandled requests are configured with `onUnhandledRequest: 'bypass'`, so any API route not defined in MSW will still hit the real backend (if available).

## 🧪 Testing

This project uses Vitest for unit testing:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch
```

## 📝 Code Quality

### ESLint Configuration

- Extends TanStack ESLint config
- React hooks rules enforcement
- TypeScript strict rules

### Prettier Configuration

- Consistent code formatting
- Auto-format on save
- Git hooks integration

### Git Hooks

- **pre-commit**: Auto-fix staged files with ESLint and Prettier
- **pre-push**: Run full checks and production build
- **commit-msg**: Conventional commit validation

## 🚀 Deployment

### Production Build

```bash
yarn build
```

This creates a `dist/` directory with optimized static files.

### Preview Production Build

```bash
yarn serve
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://conventionalcommits.org/):

```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code refactoring
test: add/fix tests
chore: maintenance tasks
```

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check existing [Issues](../../issues)
2. Create a new issue with detailed description
3. Contact the development team

## 🌐 Internationalization (i18n)

This project uses **Paraglide.js** and **Inlang** for type-safe internationalization.

### Supported Languages

- English (`en`) - Default
- German (`de`)

### Adding New Languages

1. Add a new language file in `src/shared/i18n/messages/` directory (e.g., `src/shared/i18n/messages/fr.json`)
2. Run `yarn i18n:gen` to regenerate i18n messages
3. The new language will be automatically available

### Using Translations

```tsx
import * as m from '@paraglide/messages'

// In your component
;<h1>{m.dashboardPage()}</h1>
```

### URL Localization

The router automatically localizes URLs:

- `/dashboard` → `/en/dashboard` (English)
- `/dashboard` → `/de/dashboard` (German)

URLs are automatically rewritten based on the current language.

### Translation Workflow

1. **Add new messages**: Edit message files in `src/shared/i18n/messages/` directory
2. **Generate**: Run `yarn i18n:gen` (automatically runs on `yarn install`)
3. **Translate**: Use `yarn machine-translate` for automatic translation or manually edit JSON files
4. **Use in code**: Import from `@paraglide/messages`

### Message Files Structure

```json
// src/shared/i18n/messages/en.json
{
  "dashboard_page": "Dashboard",
  "example_message": "Hello World"
}
```

## 📚 Documentation

- [TanStack Router Documentation](https://tanstack.com/router)
- [TanStack Query Documentation](https://tanstack.com/query)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://typescriptlang.org)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [Paraglide.js Documentation](https://inlang.com/m/gerre34r/library-paraglidejs)
- [Inlang Documentation](https://inlang.com/documentation)
