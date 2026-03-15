'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

const links = [
  { href: '/work',      label: 'Work'      },
  { href: '/showcase',  label: 'Showcase'  },
  { href: '/services',  label: 'Services'  },
  { href: '/about',     label: 'About'     },
  { href: '/journal',   label: 'Journal'   },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>Empathy</Link>

      <div className={styles.links}>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${pathname === href ? styles.active : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <Link href="/start" className={styles.cta}>
        Start a project ↗
      </Link>
    </nav>
  )
}
