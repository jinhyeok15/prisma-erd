// Type definitions for Prisma schema parsing

export type PrismaFieldType =
  | 'String'
  | 'Boolean'
  | 'Int'
  | 'BigInt'
  | 'Float'
  | 'Decimal'
  | 'DateTime'
  | 'Json'
  | 'Bytes'
  | string // For enums and custom types

export interface PrismaSchema {
  models: PrismaModel[]
  enums: PrismaEnum[]
}

export interface PrismaModel {
  name: string
  fields: PrismaField[]
  primaryKey?: CompositeKey // @@id
  uniqueConstraints: UniqueConstraint[] // @@unique
  indexes: Index[] // @@index
  map?: string // @@map("table_name")
}

export interface PrismaField {
  name: string
  type: PrismaFieldType
  isOptional: boolean // ?
  isList: boolean // []
  isRelation: boolean
  attributes: FieldAttribute
  relation?: RelationAttribute
}

export interface FieldAttribute {
  id?: boolean
  unique?: boolean
  default?: string | number | boolean | null
  updatedAt?: boolean
  map?: string
}

export interface RelationAttribute {
  name?: string
  fields?: string[]
  references?: string[]
  onDelete?: 'Cascade' | 'SetNull' | 'Restrict' | 'NoAction' | 'SetDefault'
  onUpdate?: 'Cascade' | 'SetNull' | 'Restrict' | 'NoAction' | 'SetDefault'
}

export interface CompositeKey {
  fields: string[]
  name?: string
  map?: string
}

export interface UniqueConstraint {
  fields: string[]
  name?: string
  map?: string
}

export interface Index {
  fields: string[]
  name?: string
  map?: string
  type?: 'BTree' | 'Hash' | 'Gist' | 'SpGist' | 'Gin' | 'Brin'
}

export interface PrismaEnum {
  name: string
  values: string[]
  map?: string
}
