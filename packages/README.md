# Packages Directory

This directory contains all workspace packages for the Prisma ERD Generator monorepo.

---

## Monorepo Structure

This project uses **Turborepo** with **Yarn Workspaces** to manage a monorepo structure.

```
prisma-erd/
  packages/              # Shared packages
    parser/           # @prisma-erd/parser - Prisma schema parser
  webapp/               # Next.js application
  package.json          # Workspace root configuration
  turbo.json           # Turborepo pipeline configuration
  tsconfig.json        # Base TypeScript configuration
```

### Architecture Overview

**Workspace Root (`/`):**

- Manages all workspace dependencies
- Configures Turborepo build pipeline
- Provides shared TypeScript and tooling configuration

**Packages (`/packages/*`):**

- Independent, publishable packages
- Can be imported by other packages or the webapp
- Each has its own `package.json`, `tsconfig.json`, and build config

**Webapp (`/webapp`):**

- Next.js application (main frontend)
- Consumes packages from `packages/`
- Private package (not publishable)

---

## Current Packages

### `@prisma-erd/parser`

**Location:** `packages/parser/`

**Purpose:** Parse Prisma schema files into structured AST

**Key exports:**

- `parsePrismaSchema(schema: string)` - Main parser function
- Type definitions from `types/schema.ts`
- Error types from `parser-error.ts`

**Dependencies:**

- `@prisma/internals` - Official Prisma parser utilities

**Build tool:** tsup (outputs CJS, ESM, and TypeScript declarations)

---

## Adding New Packages

### Quick Steps

1. Create package directory: `packages/[name]/`
2. Add `package.json` with `@prisma-erd/[name]`
3. Add `tsconfig.json` (extend root config)
4. Add `tsup.config.ts` (for build)
5. Create `src/index.ts` (entry point)
6. Run `yarn install` from root
7. Test with `yarn build`

### Detailed Guide

#### 1. Create Package Directory Structure

```bash
mkdir -p packages/[package-name]/src
cd packages/[package-name]
```

**Structure:**

```
packages/[package-name]/
  src/
    index.ts
    package.json
    tsconfig.json
    tsup.config.ts
```

#### 2. Create `package.json`

**Template:**

```json
{
  "name": "@prisma-erd/[package-name]",
  "version": "0.1.0",
  "description": "Package description",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "tsup": "^8.3.5",
    "typescript": "^5.7.2"
  }
}
```

**Key points:**

- Use `@prisma-erd/` scope for all packages
- Reference workspace packages with `"*"` (Yarn 1.x)
- Include dual exports (CJS + ESM)

#### 3. Create `tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
}
```

#### 4. Create `tsup.config.ts`

```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
})
```

#### 5. Create Entry Point (`src/index.ts`)

```typescript
/**
 * @prisma-erd/[package-name]
 *
 * Package description
 */

export function example() {
  return 'Hello from new package'
}
```

#### 6. Install Dependencies

```bash
# From repository root
yarn install
```

This will:

- Detect the new package
- Create workspace symlinks
- Install all dependencies

#### 7. Verify Setup

```bash
# Build the new package
yarn workspace @prisma-erd/[package-name] build

# Or build all packages
yarn build

# Type check
yarn type-check
```

---

## Using Workspace Packages

### In Another Package

**Add to `package.json`:**

```json
{
  "dependencies": {
    "@prisma-erd/parser": "*"
  }
}
```

**Import in TypeScript:**

```typescript
import { parsePrismaSchema } from '@prisma-erd/parser'
```

### In Webapp

**Add to `webapp/package.json`:**

```json
{
  "dependencies": {
    "@prisma-erd/parser": "*"
  }
}
```

**Import in Next.js:**

```typescript
import { parsePrismaSchema } from '@prisma-erd/parser'
```

---

## Package Types

### Library Package (Pure TypeScript)

- No framework dependencies
- Exports functions, types, classes
- Used by other packages or webapp
- **Example:** `@prisma-erd/parser`

**Build:** tsup (CJS + ESM)

### React Component Package

- Exports React components
- Has `react` as peer dependency
- Used by webapp or other React packages

**Build:** tsup with `jsx: 'preserve'`

**tsup.config.ts:**

```typescript
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react', 'react-dom'],
  jsx: 'preserve',
})
```

---

## Development Workflow

### Working on a Package

```bash
# Watch mode (auto-rebuild on changes)
yarn workspace @prisma-erd/parser dev

# Build once
yarn workspace @prisma-erd/parser build

# Type check
yarn workspace @prisma-erd/parser type-check
```

### Working on All Packages

```bash
# Build all packages in dependency order
yarn build

# Type check all packages
yarn type-check

# Clean all build outputs
yarn clean
```

### Running Tests

```bash
# Run tests for specific package
yarn workspace @prisma-erd/parser test

# Run all tests
yarn test
```

---

## Troubleshooting

### Package not found

**Error:** `Cannot find module '@prisma-erd/[package]'`

**Solution:**

```bash
rm -rf node_modules yarn.lock
yarn install
yarn build
```

### TypeScript errors

**Error:** `Cannot find module` or type errors

**Solution:**

```bash
# Rebuild all packages
yarn build

# Restart TypeScript server (VS Code)
# Cmd+Shift+P � "TypeScript: Restart TS Server"
```

### Build fails

**Check:**

1. `tsconfig.json` extends root config
2. `tsup.config.ts` is configured correctly
3. All dependencies are installed
4. Entry point (`src/index.ts`) exists

---

## Best Practices

1. **Keep packages focused** - Each package should have a single, clear purpose
2. **Export types** - Always export TypeScript types alongside implementations
3. **Use workspace dependencies** - Reference other packages with `"*"`
4. **Follow naming convention** - Use `@prisma-erd/` scope
5. **Document exports** - Add JSDoc comments to exported functions/types
6. **Test independently** - Each package should have its own tests

---

## Package Naming Convention

| Type          | Pattern              | Example              |
| ------------- | -------------------- | -------------------- |
| Core library  | `@prisma-erd/[name]` | `@prisma-erd/parser` |
| UI components | `@prisma-erd/ui`     | `@prisma-erd/ui`     |
| Utilities     | `@prisma-erd/utils`  | `@prisma-erd/utils`  |
| Types only    | `@prisma-erd/types`  | `@prisma-erd/types`  |

---

## Build System

### Turborepo Pipeline

Defined in `/turbo.json`:

- `build` - Build all packages (runs in dependency order)
- `dev` - Watch mode for development
- `test` - Run tests
- `lint` - Lint code
- `type-check` - TypeScript type checking
- `clean` - Remove build artifacts

**Caching:** Turborepo caches build outputs for faster rebuilds

### Build Order

Turborepo automatically determines build order based on dependencies:

1. Packages with no dependencies build first
2. Packages depending on others build after their dependencies
3. All builds run in parallel when possible

---

## Further Reading

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- [tsup Documentation](https://tsup.egoist.dev/)
