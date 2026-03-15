/**
 * MarkdownBody
 * ─────────────────────────────────────────
 * Converts raw markdown string → HTML.
 * Uses a simple but effective manual parser
 * (no extra dependencies beyond what we have).
 *
 * Supports:
 *   ## Headings (h2, h3)
 *   **bold**, *italic*, `code`
 *   > blockquote
 *   --- horizontal rule
 *   Paragraphs
 *   - unordered lists
 *   Inline links [text](url)
 *   > "quote" — attribution
 */

import styles from './MarkdownBody.module.css'

function parseInline(text: string): string {
  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic (not part of bold)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
}

function markdownToHtml(md: string): string {
  const lines  = md.split('\n')
  const output: string[] = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // H2
    if (/^## /.test(line)) {
      if (inList) { output.push('</ul>'); inList = false }
      output.push(`<h2>${parseInline(line.slice(3))}</h2>`)
      continue
    }

    // H3
    if (/^### /.test(line)) {
      if (inList) { output.push('</ul>'); inList = false }
      output.push(`<h3>${parseInline(line.slice(4))}</h3>`)
      continue
    }

    // HR
    if (/^---/.test(line)) {
      if (inList) { output.push('</ul>'); inList = false }
      output.push('<hr />')
      continue
    }

    // Blockquote — check for "quote" — attribution pattern
    if (/^> /.test(line)) {
      if (inList) { output.push('</ul>'); inList = false }
      const inner = line.slice(2)
      // Attribution pattern: "quote" — Name
      const attr = inner.match(/^"(.+)"\s*[—–-]\s*(.+)$/)
      if (attr) {
        output.push(
          `<blockquote><p>${parseInline(attr[1])}</p><cite>${parseInline(attr[2])}</cite></blockquote>`
        )
      } else {
        output.push(`<blockquote><p>${parseInline(inner)}</p></blockquote>`)
      }
      continue
    }

    // Unordered list item
    if (/^- /.test(line)) {
      if (!inList) { output.push('<ul>'); inList = true }
      output.push(`<li>${parseInline(line.slice(2))}</li>`)
      continue
    }

    // Empty line — close list if open
    if (line.trim() === '') {
      if (inList) { output.push('</ul>'); inList = false }
      continue
    }

    // Paragraph
    if (inList) { output.push('</ul>'); inList = false }
    output.push(`<p>${parseInline(line)}</p>`)
  }

  if (inList) output.push('</ul>')
  return output.join('\n')
}

export default function MarkdownBody({ content }: { content: string }) {
  const html = markdownToHtml(content)

  return (
    <div
      className={styles.prose}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
