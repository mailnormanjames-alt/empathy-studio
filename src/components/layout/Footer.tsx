import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.logo}>Empathy</Link>

      <p className={styles.copy}>©2025 Empathy Studio — Norman James. All rights reserved.</p>

      <nav className={styles.links}>
        <Link href="/work">Work</Link>
        <Link href="/services">Services</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <span className={styles.divider}>|</span>
        <Link href="/privacy">Privacy</Link>
        <Link href="/disclaimer">Disclaimer</Link>
        <Link href="/cancellation">Cancellation</Link>
      </nav>
    </footer>
  )
}


