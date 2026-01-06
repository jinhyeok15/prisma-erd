/**
 * @prisma-erd/parser
 *
 * Prisma schema parser for ERD generation
 */

// Re-export types
export * from './types/schema'
export * from './parser-error'

// Parser will be implemented here
export function parsePrismaSchema(schema: string) {
  throw new Error('Parser not yet implemented')
}
