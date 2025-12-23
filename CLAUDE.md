# Prisma ERD Generator - Project Context

For comprehensive project details, development roadmap, and technical decisions, see [CONTEXT.md](./CONTEXT.md).

For project overview, features, and setup instructions, see [README.md](./README.md).

## Core Product Concepts

### Two Usage Models

**Public ERDs**

- Instant, no-friction diagram generation
- Anyone can create and share
- Suitable for documentation and quick visualization
- Limited to moderate-sized schemas

**Private ERDs**

- Team collaboration and access control
- Version tracking across schema evolution
- Support for enterprise-scale schemas
- Organization-based permissions

### User Experience Principles

1. **Friction Minimization**: Public users should get value in seconds
2. **Progressive Enhancement**: Start simple, add auth only when needed
3. **Visual Clarity**: Diagrams should be self-explanatory
4. **Shareability First**: Every ERD gets a permanent, shareable URL

## Coding Conventions

### Component Exports

- All components should be exported as **default exports**, not named exports
- Example:
  ```tsx
  // ✅ Correct
  export default function MyComponent() { ... }

  // ❌ Incorrect
  export function MyComponent() { ... }
  ```

## Rules

- Don't use the yarn dev or yarn build commands. The developer has the authority.
