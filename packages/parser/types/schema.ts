/**
 * Prisma Schema AST Type Definitions
 *
 * This file defines the structure of parsed Prisma schemas.
 * Used by the parser to build an Abstract Syntax Tree (AST).
 */

// ============================================================================
// Core Schema Structure
// ============================================================================

export interface PrismaSchema {
  /** Prisma version detected from schema or package.json */
  version?: string

  /** Datasource blocks (usually 1, but can be multiple) */
  datasources: Datasource[]

  /** Generator blocks (prisma-client-js, etc.) */
  generators: Generator[]

  /** Model definitions */
  models: Model[]

  /** Enum definitions */
  enums: Enum[]

  /** Source location information */
  location: SourceLocation
}

// ============================================================================
// Datasource & Generator
// ============================================================================

export interface Datasource {
  name: string
  provider: string // "postgresql", "mysql", "mongodb", etc.
  url: DatasourceUrl
  schemas?: string[] // Multi-schema support (PostgreSQL)
  relationMode?: 'foreignKeys' | 'prisma' // v4.8+
  location: SourceLocation
}

export interface DatasourceUrl {
  value: string // env("DATABASE_URL") or direct string
  fromEnv?: string // "DATABASE_URL" if using env()
  location: SourceLocation
}

export interface Generator {
  name: string
  provider: string // "prisma-client-js", etc.
  output?: string // Custom output path
  previewFeatures?: string[] // ["fullTextSearch", "metrics"]
  binaryTargets?: string[] // ["native", "debian-openssl-1.1.x"]
  location: SourceLocation
}

// ============================================================================
// Models
// ============================================================================

export interface Model {
  name: string // PascalCase model name
  fields: Field[]
  blockAttributes: BlockAttribute[] // @@id, @@unique, @@index, @@map
  documentation?: string // /// comments above model
  location: SourceLocation
}

export interface Field {
  name: string // camelCase field name
  type: FieldType
  attributes: FieldAttribute[] // @id, @unique, @default, @relation, etc.
  documentation?: string // /// comments above field
  location: SourceLocation
}

// ============================================================================
// Field Types
// ============================================================================

export type FieldType = ScalarType | RelationType | EnumType | CompositeType

export interface ScalarType {
  kind: 'scalar'
  name: ScalarTypeName
  isOptional: boolean // Has ? modifier
  isList: boolean // Has [] modifier
  location: SourceLocation
}

export type ScalarTypeName =
  | 'String'
  | 'Boolean'
  | 'Int'
  | 'BigInt'
  | 'Float'
  | 'Decimal'
  | 'DateTime'
  | 'Json'
  | 'Bytes'
  // MongoDB specific
  | 'ObjectId'

export interface RelationType {
  kind: 'relation'
  name: string // Referenced model name
  isOptional: boolean
  isList: boolean
  location: SourceLocation
}

export interface EnumType {
  kind: 'enum'
  name: string // Enum name
  isOptional: boolean
  isList: boolean
  location: SourceLocation
}

export interface CompositeType {
  kind: 'composite'
  name: string // Composite type name (MongoDB)
  isOptional: boolean
  isList: boolean
  location: SourceLocation
}

// ============================================================================
// Field Attributes
// ============================================================================

export type FieldAttribute =
  | IdAttribute
  | UniqueAttribute
  | DefaultAttribute
  | RelationAttribute
  | MapAttribute
  | UpdatedAtAttribute
  | IgnoreAttribute

export interface IdAttribute {
  kind: 'id'
  map?: string // Custom name in database
  sort?: 'Asc' | 'Desc' // v5.0+
  clustered?: boolean // SQL Server specific
  location: SourceLocation
}

export interface UniqueAttribute {
  kind: 'unique'
  map?: string
  sort?: 'Asc' | 'Desc'
  clustered?: boolean
  location: SourceLocation
}

export interface DefaultAttribute {
  kind: 'default'
  value: DefaultValue
  location: SourceLocation
}

export type DefaultValue =
  | { type: 'literal'; value: string | number | boolean }
  | { type: 'function'; name: DefaultFunction; args?: any[] }
  | { type: 'dbgenerated'; value: string }

export type DefaultFunction = 'autoincrement' | 'cuid' | 'uuid' | 'now' | 'dbgenerated' | 'auto' // MongoDB

export interface RelationAttribute {
  kind: 'relation'
  name?: string // Named relation
  fields?: string[] // Foreign key fields
  references?: string[] // Referenced fields
  onDelete?: ReferentialAction
  onUpdate?: ReferentialAction
  map?: string // Custom constraint name
  location: SourceLocation
}

export type ReferentialAction = 'Cascade' | 'Restrict' | 'NoAction' | 'SetNull' | 'SetDefault'

export interface MapAttribute {
  kind: 'map'
  value: string // Database column name
  location: SourceLocation
}

export interface UpdatedAtAttribute {
  kind: 'updatedAt'
  location: SourceLocation
}

export interface IgnoreAttribute {
  kind: 'ignore'
  location: SourceLocation
}

// ============================================================================
// Block Attributes (@@...)
// ============================================================================

export type BlockAttribute =
  | BlockIdAttribute
  | BlockUniqueAttribute
  | BlockIndexAttribute
  | BlockMapAttribute
  | BlockIgnoreAttribute

export interface BlockIdAttribute {
  kind: 'id'
  fields: string[]
  name?: string // Constraint name
  map?: string // Custom name in database
  clustered?: boolean
  location: SourceLocation
}

export interface BlockUniqueAttribute {
  kind: 'unique'
  fields: string[]
  name?: string
  map?: string
  clustered?: boolean
  location: SourceLocation
}

export interface BlockIndexAttribute {
  kind: 'index'
  fields: IndexField[]
  name?: string
  map?: string
  type?: IndexType // v4.0+
  clustered?: boolean
  location: SourceLocation
}

export interface IndexField {
  name: string
  sort?: 'Asc' | 'Desc'
  length?: number // MySQL prefix length
  ops?: string // PostgreSQL operator class
}

export type IndexType = 'BTree' | 'Hash' | 'Gist' | 'Gin' | 'SpGist' | 'Brin' // PostgreSQL specific

export interface BlockMapAttribute {
  kind: 'map'
  value: string // Database table name
  location: SourceLocation
}

export interface BlockIgnoreAttribute {
  kind: 'ignore'
  location: SourceLocation
}

// ============================================================================
// Enums
// ============================================================================

export interface Enum {
  name: string
  values: EnumValue[]
  blockAttributes: EnumBlockAttribute[]
  documentation?: string
  location: SourceLocation
}

export interface EnumValue {
  name: string
  attributes: EnumValueAttribute[]
  documentation?: string
  location: SourceLocation
}

export interface EnumValueAttribute {
  kind: 'map'
  value: string // Database value
  location: SourceLocation
}

export type EnumBlockAttribute = EnumBlockMapAttribute | EnumBlockSchemaAttribute

export interface EnumBlockMapAttribute {
  kind: 'map'
  value: string // Database enum name
  location: SourceLocation
}

export interface EnumBlockSchemaAttribute {
  kind: 'schema'
  value: string // PostgreSQL schema name
  location: SourceLocation
}

// ============================================================================
// Source Location (for error messages)
// ============================================================================

export interface SourceLocation {
  /** Starting line number (1-indexed) */
  line: number

  /** Starting column number (1-indexed) */
  column: number

  /** Character offset from start of file (0-indexed) */
  offset: number

  /** Length in characters */
  length: number

  /** Ending line number (1-indexed) */
  endLine?: number

  /** Ending column number (1-indexed) */
  endColumn?: number
}

// ============================================================================
// Relation Metadata (for ERD generation)
// ============================================================================

export interface RelationMetadata {
  /** Unique relation ID */
  id: string

  /** Relation type */
  type: '1:1' | '1:N' | 'M:N'

  /** Source model */
  from: {
    model: string
    field: string
  }

  /** Target model */
  to: {
    model: string
    field: string
  }

  /** Named relation (for disambiguation) */
  name?: string

  /** Is this a self-relation? */
  isSelfRelation: boolean

  /** Foreign key configuration */
  foreignKey?: {
    fields: string[]
    references: string[]
    onDelete?: ReferentialAction
    onUpdate?: ReferentialAction
  }
}
