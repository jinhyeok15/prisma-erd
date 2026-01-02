/**
 * Parser Error Type Definitions
 *
 * Structured error handling for Prisma schema parsing.
 * Provides actionable error messages with line/column locations.
 */

import { SourceLocation } from './types/schema'

// ============================================================================
// Error Severity
// ============================================================================

export type ErrorSeverity = 'error' | 'warning' | 'info'

// ============================================================================
// Parser Error Class
// ============================================================================

export class ParserError extends Error {
  /** Error code (E1001, W5001, etc.) */
  code: ErrorCode

  /** Error severity */
  severity: ErrorSeverity

  /** Source location where error occurred */
  location: SourceLocation

  /** Code frame showing context around error */
  codeFrame?: string

  /** Actionable suggestions to fix the error */
  suggestions?: string[]

  /** Link to Prisma documentation */
  docUrl?: string

  constructor(
    message: string,
    code: ErrorCode,
    location: SourceLocation,
    options?: {
      severity?: ErrorSeverity
      codeFrame?: string
      suggestions?: string[]
      docUrl?: string
    }
  ) {
    super(message)
    this.name = 'ParserError'
    this.code = code
    this.severity = options?.severity || 'error'
    this.location = location
    this.codeFrame = options?.codeFrame
    this.suggestions = options?.suggestions
    this.docUrl = options?.docUrl
  }

  /** Format error for terminal output */
  toTerminalString(sourceCode: string): string {
    const lines = sourceCode.split('\n')
    const { line, column } = this.location

    let output = ''
    output += `\n${this.severity.toUpperCase()}: ${this.message}\n`
    output += `  --> ${this.code} at line ${line}, column ${column}\n`

    if (this.codeFrame) {
      output += `\n${this.codeFrame}\n`
    } else {
      // Generate simple code frame
      const contextLines = 2
      const startLine = Math.max(0, line - contextLines - 1)
      const endLine = Math.min(lines.length, line + contextLines)

      for (let i = startLine; i < endLine; i++) {
        const lineNum = i + 1
        const prefix = lineNum === line ? '>' : ' '
        output += `${prefix} ${lineNum.toString().padStart(4)} | ${lines[i]}\n`

        if (lineNum === line) {
          output += `  ${' '.repeat(4)} | ${' '.repeat(column - 1)}^\n`
        }
      }
    }

    if (this.suggestions && this.suggestions.length > 0) {
      output += `\nSuggestions:\n`
      this.suggestions.forEach((s, i) => {
        output += `  ${i + 1}. ${s}\n`
      })
    }

    if (this.docUrl) {
      output += `\nLearn more: ${this.docUrl}\n`
    }

    return output
  }

  /** Format error for web UI */
  toJSON() {
    return {
      message: this.message,
      code: this.code,
      severity: this.severity,
      location: this.location,
      codeFrame: this.codeFrame,
      suggestions: this.suggestions,
      docUrl: this.docUrl,
    }
  }
}

// ============================================================================
// Error Codes
// ============================================================================

export type ErrorCode =
  // Syntax Errors (E1xxx)
  | 'E1001' // Unexpected token
  | 'E1002' // Unexpected end of file
  | 'E1003' // Invalid identifier
  | 'E1004' // Missing semicolon
  | 'E1005' // Unclosed block
  | 'E1006' // Invalid character
  | 'E1007' // Invalid string literal
  | 'E1008' // Invalid number literal

  // Model Errors (E2xxx)
  | 'E2001' // Model name must be PascalCase
  | 'E2002' // Duplicate model name
  | 'E2003' // Empty model
  | 'E2004' // Invalid model name
  | 'E2005' // Reserved model name

  // Field Errors (E3xxx)
  | 'E3001' // Field name must be camelCase
  | 'E3002' // Duplicate field name
  | 'E3003' // Invalid field type
  | 'E3004' // Unknown scalar type
  | 'E3005' // Unknown enum type
  | 'E3006' // Unknown model type
  | 'E3007' // Invalid type modifier
  | 'E3008' // Reserved field name

  // Attribute Errors (E4xxx)
  | 'E4001' // Unknown attribute
  | 'E4002' // Invalid attribute argument
  | 'E4003' // Missing required attribute argument
  | 'E4004' // Duplicate attribute
  | 'E4005' // Invalid @default value
  | 'E4006' // Invalid @relation configuration
  | 'E4007' // @id on optional field
  | 'E4008' // Multiple @id attributes
  | 'E4009' // Invalid @@id fields
  | 'E4010' // Invalid @@unique fields
  | 'E4011' // Invalid @@index fields

  // Relation Errors (E5xxx)
  | 'E5001' // Missing relation field
  | 'E5002' // Invalid relation field type
  | 'E5003' // Ambiguous relation
  | 'E5004' // Missing back-relation field
  | 'E5005' // Invalid @relation fields
  | 'E5006' // Invalid @relation references
  | 'E5007' // Self-relation must be optional
  | 'E5008' // M:N relation cannot have scalar fields

  // Enum Errors (E6xxx)
  | 'E6001' // Enum name must be PascalCase
  | 'E6002' // Duplicate enum name
  | 'E6003' // Empty enum
  | 'E6004' // Duplicate enum value
  | 'E6005' // Invalid enum value name
  | 'E6006' // Reserved enum name

  // Version/Compatibility Errors (E7xxx)
  | 'E7001' // Unsupported Prisma version
  | 'E7002' // Feature requires newer Prisma version
  | 'E7003' // Feature deprecated in this version
  | 'E7004' // Provider not supported
  | 'E7005' // relationMode not supported by provider

  // Warnings (Wxxx)
  | 'W1001' // Unused model
  | 'W2001' // Missing @updatedAt on timestamp field
  | 'W3001' // Consider using @@index for query performance
  | 'W4001' // Large number of fields (>50)
  | 'W5001' // relationMode "prisma" may impact performance;

// ============================================================================
// Error Metadata
// ============================================================================

export interface ErrorMetadata {
  code: ErrorCode
  defaultMessage: string
  severity: ErrorSeverity
  category: ErrorCategory
  docUrl?: string
}

export type ErrorCategory =
  | 'syntax'
  | 'model'
  | 'field'
  | 'attribute'
  | 'relation'
  | 'enum'
  | 'version'
  | 'warning'

/** Map of error codes to their metadata */
export const ERROR_METADATA: Record<ErrorCode, ErrorMetadata> = {
  // Syntax Errors
  E1001: {
    code: 'E1001',
    defaultMessage: 'Unexpected token',
    severity: 'error',
    category: 'syntax',
  },
  E1002: {
    code: 'E1002',
    defaultMessage: 'Unexpected end of file',
    severity: 'error',
    category: 'syntax',
  },
  E1003: {
    code: 'E1003',
    defaultMessage: 'Invalid identifier',
    severity: 'error',
    category: 'syntax',
  },
  E1004: {
    code: 'E1004',
    defaultMessage: 'Missing semicolon',
    severity: 'error',
    category: 'syntax',
  },
  E1005: {
    code: 'E1005',
    defaultMessage: 'Unclosed block',
    severity: 'error',
    category: 'syntax',
  },
  E1006: {
    code: 'E1006',
    defaultMessage: 'Invalid character',
    severity: 'error',
    category: 'syntax',
  },
  E1007: {
    code: 'E1007',
    defaultMessage: 'Invalid string literal',
    severity: 'error',
    category: 'syntax',
  },
  E1008: {
    code: 'E1008',
    defaultMessage: 'Invalid number literal',
    severity: 'error',
    category: 'syntax',
  },

  // Model Errors
  E2001: {
    code: 'E2001',
    defaultMessage: 'Model name must be PascalCase',
    severity: 'error',
    category: 'model',
    docUrl:
      'https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#naming-conventions',
  },
  E2002: {
    code: 'E2002',
    defaultMessage: 'Duplicate model name',
    severity: 'error',
    category: 'model',
  },
  E2003: {
    code: 'E2003',
    defaultMessage: 'Empty model',
    severity: 'error',
    category: 'model',
  },
  E2004: {
    code: 'E2004',
    defaultMessage: 'Invalid model name',
    severity: 'error',
    category: 'model',
  },
  E2005: {
    code: 'E2005',
    defaultMessage: 'Reserved model name',
    severity: 'error',
    category: 'model',
  },

  // Field Errors
  E3001: {
    code: 'E3001',
    defaultMessage: 'Field name must be camelCase',
    severity: 'error',
    category: 'field',
    docUrl:
      'https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#naming-conventions',
  },
  E3002: {
    code: 'E3002',
    defaultMessage: 'Duplicate field name',
    severity: 'error',
    category: 'field',
  },
  E3003: {
    code: 'E3003',
    defaultMessage: 'Invalid field type',
    severity: 'error',
    category: 'field',
  },
  E3004: {
    code: 'E3004',
    defaultMessage: 'Unknown scalar type',
    severity: 'error',
    category: 'field',
    docUrl:
      'https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types',
  },
  E3005: {
    code: 'E3005',
    defaultMessage: 'Unknown enum type',
    severity: 'error',
    category: 'field',
  },
  E3006: {
    code: 'E3006',
    defaultMessage: 'Unknown model type',
    severity: 'error',
    category: 'field',
  },
  E3007: {
    code: 'E3007',
    defaultMessage: 'Invalid type modifier',
    severity: 'error',
    category: 'field',
  },
  E3008: {
    code: 'E3008',
    defaultMessage: 'Reserved field name',
    severity: 'error',
    category: 'field',
  },

  // Attribute Errors
  E4001: {
    code: 'E4001',
    defaultMessage: 'Unknown attribute',
    severity: 'error',
    category: 'attribute',
    docUrl: 'https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#attributes',
  },
  E4002: {
    code: 'E4002',
    defaultMessage: 'Invalid attribute argument',
    severity: 'error',
    category: 'attribute',
  },
  E4003: {
    code: 'E4003',
    defaultMessage: 'Missing required attribute argument',
    severity: 'error',
    category: 'attribute',
  },
  E4004: {
    code: 'E4004',
    defaultMessage: 'Duplicate attribute',
    severity: 'error',
    category: 'attribute',
  },
  E4005: {
    code: 'E4005',
    defaultMessage: 'Invalid @default value',
    severity: 'error',
    category: 'attribute',
    docUrl: 'https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#default',
  },
  E4006: {
    code: 'E4006',
    defaultMessage: 'Invalid @relation configuration',
    severity: 'error',
    category: 'attribute',
    docUrl: 'https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#relation',
  },
  E4007: {
    code: 'E4007',
    defaultMessage: '@id cannot be used on optional fields',
    severity: 'error',
    category: 'attribute',
  },
  E4008: {
    code: 'E4008',
    defaultMessage: 'Multiple @id attributes on the same field',
    severity: 'error',
    category: 'attribute',
  },
  E4009: {
    code: 'E4009',
    defaultMessage: 'Invalid @@id fields',
    severity: 'error',
    category: 'attribute',
  },
  E4010: {
    code: 'E4010',
    defaultMessage: 'Invalid @@unique fields',
    severity: 'error',
    category: 'attribute',
  },
  E4011: {
    code: 'E4011',
    defaultMessage: 'Invalid @@index fields',
    severity: 'error',
    category: 'attribute',
  },

  // Relation Errors
  E5001: {
    code: 'E5001',
    defaultMessage: 'Missing relation field',
    severity: 'error',
    category: 'relation',
    docUrl: 'https://www.prisma.io/docs/concepts/components/prisma-schema/relations',
  },
  E5002: {
    code: 'E5002',
    defaultMessage: 'Invalid relation field type',
    severity: 'error',
    category: 'relation',
  },
  E5003: {
    code: 'E5003',
    defaultMessage: 'Ambiguous relation',
    severity: 'error',
    category: 'relation',
    docUrl:
      'https://www.prisma.io/docs/concepts/components/prisma-schema/relations#disambiguating-relations',
  },
  E5004: {
    code: 'E5004',
    defaultMessage: 'Missing back-relation field',
    severity: 'error',
    category: 'relation',
  },
  E5005: {
    code: 'E5005',
    defaultMessage: 'Invalid @relation fields',
    severity: 'error',
    category: 'relation',
  },
  E5006: {
    code: 'E5006',
    defaultMessage: 'Invalid @relation references',
    severity: 'error',
    category: 'relation',
  },
  E5007: {
    code: 'E5007',
    defaultMessage: 'Self-relation must be optional or list',
    severity: 'error',
    category: 'relation',
  },
  E5008: {
    code: 'E5008',
    defaultMessage: 'Many-to-many relation cannot have scalar list fields',
    severity: 'error',
    category: 'relation',
  },

  // Enum Errors
  E6001: {
    code: 'E6001',
    defaultMessage: 'Enum name must be PascalCase',
    severity: 'error',
    category: 'enum',
  },
  E6002: {
    code: 'E6002',
    defaultMessage: 'Duplicate enum name',
    severity: 'error',
    category: 'enum',
  },
  E6003: {
    code: 'E6003',
    defaultMessage: 'Empty enum',
    severity: 'error',
    category: 'enum',
  },
  E6004: {
    code: 'E6004',
    defaultMessage: 'Duplicate enum value',
    severity: 'error',
    category: 'enum',
  },
  E6005: {
    code: 'E6005',
    defaultMessage: 'Invalid enum value name',
    severity: 'error',
    category: 'enum',
  },
  E6006: {
    code: 'E6006',
    defaultMessage: 'Reserved enum name',
    severity: 'error',
    category: 'enum',
  },

  // Version/Compatibility Errors
  E7001: {
    code: 'E7001',
    defaultMessage: 'Unsupported Prisma version',
    severity: 'error',
    category: 'version',
  },
  E7002: {
    code: 'E7002',
    defaultMessage: 'Feature requires newer Prisma version',
    severity: 'error',
    category: 'version',
  },
  E7003: {
    code: 'E7003',
    defaultMessage: 'Feature deprecated in this version',
    severity: 'warning',
    category: 'version',
  },
  E7004: {
    code: 'E7004',
    defaultMessage: 'Provider not supported',
    severity: 'error',
    category: 'version',
  },
  E7005: {
    code: 'E7005',
    defaultMessage: 'relationMode not supported by this provider',
    severity: 'error',
    category: 'version',
  },

  // Warnings
  W1001: {
    code: 'W1001',
    defaultMessage: 'Unused model',
    severity: 'warning',
    category: 'warning',
  },
  W2001: {
    code: 'W2001',
    defaultMessage: 'Consider using @updatedAt on timestamp fields',
    severity: 'warning',
    category: 'warning',
  },
  W3001: {
    code: 'W3001',
    defaultMessage: 'Consider adding @@index for better query performance',
    severity: 'warning',
    category: 'warning',
  },
  W4001: {
    code: 'W4001',
    defaultMessage: 'Model has a large number of fields',
    severity: 'warning',
    category: 'warning',
  },
  W5001: {
    code: 'W5001',
    defaultMessage: 'relationMode "prisma" may impact performance',
    severity: 'warning',
    category: 'warning',
  },
}

// ============================================================================
// Error Collection
// ============================================================================

export class ErrorCollection {
  private errors: ParserError[] = []

  add(error: ParserError): void {
    this.errors.push(error)
  }

  hasErrors(): boolean {
    return this.errors.some(e => e.severity === 'error')
  }

  hasWarnings(): boolean {
    return this.errors.some(e => e.severity === 'warning')
  }

  getErrors(): ParserError[] {
    return this.errors.filter(e => e.severity === 'error')
  }

  getWarnings(): ParserError[] {
    return this.errors.filter(e => e.severity === 'warning')
  }

  getAll(): ParserError[] {
    return this.errors
  }

  clear(): void {
    this.errors = []
  }

  toJSON() {
    return {
      errors: this.getErrors().map(e => e.toJSON()),
      warnings: this.getWarnings().map(e => e.toJSON()),
    }
  }
}
