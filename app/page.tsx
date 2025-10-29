'use client'

import { useState } from 'react'

export default function Home() {
  const [schema, setSchema] = useState('')

  const exampleSchema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id     String @id @default(uuid())
  bio    String?
  userId String @unique
  user   User   @relation(fields: [userId], references: [id])
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  tags      Tag[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
}

model Tag {
  id    String @id @default(uuid())
  name  String @unique
  posts Post[]
}`

  const loadExample = () => {
    setSchema(exampleSchema)
  }

  const handleGenerate = () => {
    if (!schema.trim()) {
      alert('Please paste your Prisma schema first')
      return
    }
    alert('ERD generation coming soon!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-24">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              Transform Your Prisma Schema
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                into Beautiful, Interactive ERDs
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
              Paste your schema, get a shareable diagram. No login required for schemas under 50KB.
            </p>
          </div>

          {/* Schema Input Section */}
          <div className="mt-12">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
                <textarea
                  value={schema}
                  onChange={e => setSchema(e.target.value)}
                  placeholder="Paste your Prisma schema here..."
                  className="h-64 w-full resize-none rounded-md border border-gray-300 bg-gray-50 p-4 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                />
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
                  <button
                    onClick={loadExample}
                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Load Example Schema
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                  >
                    Generate ERD Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-24">
            <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Key Features
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon="🚀"
                title="Instant Generation"
                description="Paste and visualize in seconds. No friction, no signup."
              />
              <FeatureCard
                icon="🔗"
                title="Permanent URLs"
                description="Every ERD gets a unique, shareable link that never expires."
              />
              <FeatureCard
                icon="🎨"
                title="Prisma-Native"
                description="Visualizes @relations, @unique, @@id, enums, and all Prisma-specific features clearly."
              />
              <FeatureCard
                icon="⚡"
                title="Smart Scaling"
                description="Public access for quick diagrams. Login for unlimited size and team features."
              />
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-24">
            <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              How It Works
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <StepCard number="1" title="Paste" description="Copy your schema.prisma content" />
              <StepCard
                number="2"
                title="Generate"
                description="Click one button to create your ERD"
              />
              <StepCard
                number="3"
                title="Share"
                description="Get a permanent URL to share with anyone"
              />
            </div>
          </div>

          {/* Progressive Enhancement */}
          <div className="mt-24">
            <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Progressive Enhancement
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <TierCard
                title="Start Free"
                description="Anyone can create public ERDs instantly"
                highlight={false}
              />
              <TierCard
                title="Go Pro"
                description="Login for private ERDs with version control"
                highlight={true}
              />
              <TierCard
                title="Scale Up"
                description="Organizations get unlimited schemas, team access, and history tracking"
                highlight={false}
              />
            </div>
          </div>

          {/* Use Cases */}
          <div className="mt-24">
            <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Use Cases
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <UseCaseCard
                icon="📚"
                title="Documentation"
                description="Share clean database structure with your team"
              />
              <UseCaseCard
                icon="👨‍💻"
                title="Code Reviews"
                description="Visualize schema changes in PRs"
              />
              <UseCaseCard
                icon="🎓"
                title="Onboarding"
                description="Help new developers understand your data model"
              />
              <UseCaseCard
                icon="💼"
                title="Planning"
                description="Design and discuss database structure before coding"
              />
            </div>
          </div>

          {/* What Makes It Different */}
          <div className="mt-24">
            <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800 sm:p-12">
              <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                What Makes It Different
              </h2>
              <div className="mt-8 space-y-4 text-lg text-gray-600 dark:text-gray-300">
                <p className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <span>
                    Generic ERD tools miss Prisma&apos;s @relation attributes, composite keys, and
                    special decorators
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <span>Mermaid diagrams lack interactivity and visual clarity</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    This tool is built specifically for Prisma schemas - every feature matters
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Ready to visualize your schema?
            </h2>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
              >
                Generate Your First ERD
              </button>
              <a
                href="https://github.com/yourusername/prisma-erd"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-gray-300 bg-white px-8 py-4 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Star on GitHub
              </a>
            </div>
            <p className="mt-6 text-gray-600 dark:text-gray-400">
              Need team collaboration? Private ERDs with version control coming soon.
            </p>
          </div>

          {/* Footer Links */}
          <footer className="mt-24 border-t border-gray-200 pt-12 dark:border-gray-700">
            <div className="flex flex-wrap justify-center gap-8 text-gray-600 dark:text-gray-400">
              <a
                href="https://github.com/jinhyeok15/prisma-erd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 dark:hover:text-gray-200"
              >
                GitHub Repository
              </a>
              <span className="text-gray-400">•</span>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                Documentation (Coming Soon)
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="https://github.com/jinhyeok15/prisma-erd/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 dark:hover:text-gray-200"
              >
                Report an Issue
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="https://opensource.org/licenses/MIT"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 dark:hover:text-gray-200"
              >
                MIT License
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 dark:bg-gray-800">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-2xl font-bold text-white shadow-lg">
        {number}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

function TierCard({
  title,
  description,
  highlight,
}: {
  title: string
  description: string
  highlight: boolean
}) {
  return (
    <div
      className={`rounded-lg p-6 shadow-lg transition-transform hover:scale-105 ${
        highlight
          ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
          : 'bg-white dark:bg-gray-800'
      }`}
    >
      <h3
        className={`text-xl font-semibold ${
          highlight ? 'text-white' : 'text-gray-900 dark:text-white'
        }`}
      >
        {title}
      </h3>
      <p className={`mt-2 ${highlight ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300'}`}>
        {description}
      </p>
    </div>
  )
}

function UseCaseCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 dark:bg-gray-800">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
