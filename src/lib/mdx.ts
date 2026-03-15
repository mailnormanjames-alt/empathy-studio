/**
 * lib/mdx.ts
 * ─────────────────────────────────────────────
 * Reads .md files from /content/* and parses
 * frontmatter + markdown body via gray-matter.
 *
 * Usage:
 *   import { getAllWork, getWorkBySlug } from '@/lib/mdx'
 *   import { getAllJournal, getJournalBySlug } from '@/lib/mdx'
 */

import fs   from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ── Types ────────────────────────────────────

export interface WorkFrontmatter {
  title:       string   // e.g. "Aura — Wellness Platform"
  client:      string   // e.g. "Aura Health Ltd."
  year:        number   // e.g. 2025
  categories:  string[] // e.g. ["branding", "web"]
  tags:        string[] // e.g. ["Identity", "Motion"]
  size:        'large' | 'medium' | 'small' | 'tall' | 'wide'
  coverImage:  string   // e.g. "/images/work/aura/cover.jpg"
  images:      string[] // additional project images
  services:    string[]
  timeline:    string
  featured:    boolean
  stats: {
    label: string
    value: string
    sub?:  string
  }[]
}

export interface WorkPost {
  slug:        string
  frontmatter: WorkFrontmatter
  content:     string   // raw markdown body
}

export interface JournalFrontmatter {
  title:       string
  excerpt:     string
  author:      string
  date:        string   // ISO string e.g. "2025-03-12"
  category:    string
  tags:        string[]
  readTime:    number   // minutes
  coverImage:  string
  featured:    boolean
}

export interface JournalPost {
  slug:        string
  frontmatter: JournalFrontmatter
  content:     string
}

// ── Helpers ──────────────────────────────────

const CONTENT_ROOT = path.join(process.cwd(), 'content')

function readDir(dir: string): string[] {
  const full = path.join(CONTENT_ROOT, dir)
  if (!fs.existsSync(full)) return []
  return fs.readdirSync(full).filter(f => f.endsWith('.md'))
}

function parseFile<T>(filePath: string): { frontmatter: T; content: string } {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data as T, content }
}

// ── Work ─────────────────────────────────────

export function getAllWork(): WorkPost[] {
  const files = readDir('work')
  return files
    .map(file => {
      const slug = file.replace('.md', '')
      const { frontmatter, content } = parseFile<WorkFrontmatter>(
        path.join(CONTENT_ROOT, 'work', file)
      )
      return { slug, frontmatter, content }
    })
    .sort((a, b) => b.frontmatter.year - a.frontmatter.year)
}

export function getWorkBySlug(slug: string): WorkPost | null {
  const filePath = path.join(CONTENT_ROOT, 'work', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const { frontmatter, content } = parseFile<WorkFrontmatter>(filePath)
  return { slug, frontmatter, content }
}

export function getFeaturedWork(): WorkPost[] {
  return getAllWork().filter(p => p.frontmatter.featured)
}

// ── Journal ───────────────────────────────────

export function getAllJournal(): JournalPost[] {
  const files = readDir('journal')
  return files
    .map(file => {
      const slug = file.replace('.md', '')
      const { frontmatter, content } = parseFile<JournalFrontmatter>(
        path.join(CONTENT_ROOT, 'journal', file)
      )
      return { slug, frontmatter, content }
    })
    .sort((a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
}

export function getJournalBySlug(slug: string): JournalPost | null {
  const filePath = path.join(CONTENT_ROOT, 'journal', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const { frontmatter, content } = parseFile<JournalFrontmatter>(filePath)
  return { slug, frontmatter, content }
}

export function getFeaturedJournal(): JournalPost | null {
  return getAllJournal().find(p => p.frontmatter.featured) ?? null
}
