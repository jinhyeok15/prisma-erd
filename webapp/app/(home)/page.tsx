'use client'

import { useState } from 'react'
import Image from 'next/image'
import FeatureCard from './_components/FeatureCard'
import StepCard from './_components/StepCard'
import TierCard from './_components/TierCard'
import UseCaseCard from './_components/UseCaseCard'
import FloatingMessageButton from './_components/FloatingMessageButton'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Animated background gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] animate-pulse rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] animate-pulse rounded-full bg-purple-500/10 blur-3xl delay-1000" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-pink-500/10 blur-3xl delay-500" />
      </div>

      {/* Hero Section */}
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-24">
          {/* Logo and Header */}
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20 blur-2xl" />
                <Image
                  src="/logo.svg"
                  alt="Prisma ERD Logo"
                  width={120}
                  height={120}
                  className="relative drop-shadow-2xl"
                />
              </div>
            </div>
            <h1 className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              Transform Your Prisma Schema
              <br />
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text">
                into Beautiful, Interactive ERDs
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
              Paste your schema, get a shareable diagram. No login required for schemas under 50KB.
            </p>
          </div>

          {/* Schema Input Section */}
          <div className="mt-12">
            <div className="mx-auto max-w-4xl">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-1 backdrop-blur-xl">
                <div className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20 blur group-hover:opacity-30" />
                <div className="relative rounded-xl bg-slate-900/95 p-6">
                  <textarea
                    value={schema}
                    onChange={e => setSchema(e.target.value)}
                    placeholder="Paste your Prisma schema here..."
                    className="h-64 w-full resize-none rounded-lg border border-slate-700/50 bg-slate-950/50 p-4 font-mono text-sm text-gray-100 placeholder-gray-500 shadow-inner focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
                    <button
                      onClick={loadExample}
                      className="group/btn relative overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-3 font-medium text-gray-200 transition-all hover:border-cyan-500/50 hover:bg-slate-800"
                    >
                      <span className="relative z-10">Load Example Schema</span>
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="group/btn relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-8 py-3 font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/40"
                    >
                      <span className="relative z-10">Generate ERD Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-32">
            <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">Key Features</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon="🚀"
                title="Instant Generation"
                description="Paste and visualize in seconds. No friction, no signup."
                gradient="from-cyan-500 to-blue-500"
              />
              <FeatureCard
                icon="🔗"
                title="Permanent URLs"
                description="Every ERD gets a unique, shareable link that never expires."
                gradient="from-purple-500 to-pink-500"
              />
              <FeatureCard
                icon="🎨"
                title="Prisma-Native"
                description="Visualizes @relations, @unique, @@id, enums, and all Prisma-specific features clearly."
                gradient="from-pink-500 to-rose-500"
              />
              <FeatureCard
                icon="⚡"
                title="Smart Scaling"
                description="Public access for quick diagrams. Login for unlimited size and team features."
                gradient="from-green-400 to-cyan-500"
              />
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-32">
            <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">How It Works</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <StepCard
                number="1"
                title="Paste"
                description="Copy your schema.prisma content"
                color="cyan"
              />
              <StepCard
                number="2"
                title="Generate"
                description="Click one button to create your ERD"
                color="purple"
              />
              <StepCard
                number="3"
                title="Share"
                description="Get a permanent URL to share with anyone"
                color="pink"
              />
            </div>
          </div>

          {/* Progressive Enhancement */}
          <div className="mt-32">
            <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
              Progressive Enhancement
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <TierCard
                title="Start Free"
                description="Anyone can create public ERDs instantly"
                gradient="from-slate-800 to-slate-700"
                borderGradient="from-cyan-500 to-cyan-600"
              />
              <TierCard
                title="Go Pro"
                description="Login for private ERDs with version control"
                gradient="from-purple-600 to-pink-600"
                borderGradient="from-purple-400 to-pink-400"
                highlight={true}
              />
              <TierCard
                title="Scale Up"
                description="Organizations get unlimited schemas, team access, and history tracking"
                gradient="from-slate-800 to-slate-700"
                borderGradient="from-green-400 to-cyan-500"
              />
            </div>
          </div>

          {/* Use Cases */}
          <div className="mt-32">
            <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">Use Cases</h2>
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
          <div className="mt-32">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-1 backdrop-blur-xl">
              <div className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-10 blur" />
              <div className="relative rounded-xl bg-slate-900/95 p-8 sm:p-12">
                <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
                  What Makes It Different
                </h2>
                <div className="mt-8 space-y-4 text-lg text-gray-300">
                  <div className="flex items-start gap-4 rounded-lg bg-slate-800/50 p-4">
                    <span className="text-2xl">❌</span>
                    <span>
                      Generic ERD tools miss Prisma&apos;s @relation attributes, composite keys, and
                      special decorators
                    </span>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg bg-slate-800/50 p-4">
                    <span className="text-2xl">❌</span>
                    <span>Mermaid diagrams lack interactivity and visual clarity</span>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-4">
                    <span className="text-2xl">✅</span>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold text-transparent">
                      This tool is built specifically for Prisma schemas - every feature matters
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-32 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to visualize your schema?
            </h2>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/40"
              >
                Generate Your First ERD
              </button>
              <a
                href="https://github.com/jinhyeok15/prisma-erd"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-700 bg-slate-800/50 px-8 py-4 text-lg font-medium text-gray-200 transition-all hover:border-cyan-500/50 hover:bg-slate-800"
              >
                Star on GitHub
              </a>
            </div>
            <p className="mt-6 text-gray-400">
              Need team collaboration? Private ERDs with version control coming soon.
            </p>
          </div>

          {/* Footer Links */}
          <footer className="mt-24 border-t border-slate-800 pt-12">
            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <a
                href="https://github.com/jinhyeok15/prisma-erd"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cyan-400"
              >
                GitHub Repository
              </a>
              <span className="text-slate-700">•</span>
              <a href="#" className="transition-colors hover:text-cyan-400">
                Documentation (Coming Soon)
              </a>
              <span className="text-slate-700">•</span>
              <a
                href="https://github.com/jinhyeok15/prisma-erd/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cyan-400"
              >
                Report an Issue
              </a>
              <span className="text-slate-700">•</span>
              <a
                href="https://opensource.org/licenses/MIT"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cyan-400"
              >
                MIT License
              </a>
            </div>
          </footer>
        </div>
      </main>

      {/* Floating Message Button */}
      <FloatingMessageButton />
    </div>
  )
}
