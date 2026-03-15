import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.headline}>Privacy <em>Policy</em></h1>
        <p className={styles.meta}>Last updated: March 2025 &nbsp;·&nbsp; Empathy Studio, India</p>
      </section>

      <div className={styles.body}>

        <div className={styles.highlight}>
          <strong>The short version</strong>
          We collect only what we need to run our business and communicate with you. We never sell your data. We never share it with third parties except the tools we use to operate (listed below).
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>01</span>
          <h2 className={styles.sectionTitle}>Who we are</h2>
          <p className={styles.text}>
            Empathy Studio is a creative design and development agency based in India. We provide branding, UI/UX design, web development, 3D & motion, and graphic design services to clients worldwide.
          </p>
          <p className={styles.text}>
            For the purposes of this Privacy Policy, "we", "us", and "our" refers to Empathy Studio. "You" refers to any person who visits our website or engages our services.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>02</span>
          <h2 className={styles.sectionTitle}>What information we collect</h2>
          <p className={styles.text}>We collect information in two ways:</p>
          <p className={styles.text}><strong>Information you give us directly:</strong></p>
          <ul className={styles.list}>
            <li>Your name, email address, and company name when you fill out our contact or project enquiry form</li>
            <li>Project details, budget range, and timeline information you share with us</li>
            <li>Any files, briefs, or documents you send us during a project</li>
          </ul>
          <p className={styles.text}><strong>Information collected automatically:</strong></p>
          <ul className={styles.list}>
            <li>Basic analytics data (pages visited, time on site, browser type) via privacy-respecting tools</li>
            <li>Your IP address and approximate location (country/region level only)</li>
            <li>Cookies required for the site to function correctly</li>
          </ul>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>03</span>
          <h2 className={styles.sectionTitle}>How we use your information</h2>
          <p className={styles.text}>We use the information we collect to:</p>
          <ul className={styles.list}>
            <li>Respond to your enquiries and assess project fit</li>
            <li>Communicate with you throughout the project lifecycle</li>
            <li>Send invoices and manage payments</li>
            <li>Improve our website and service offering</li>
            <li>Comply with legal obligations under Indian law</li>
          </ul>
          <p className={styles.text}>
            We do not use your data for automated decision-making, profiling, or targeted advertising.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>04</span>
          <h2 className={styles.sectionTitle}>Who we share your data with</h2>
          <p className={styles.text}>
            We do not sell, rent, or trade your personal information. We may share limited data with the following service providers who help us operate:
          </p>
          <ul className={styles.list}>
            <li><strong>Email providers</strong> (e.g. Google Workspace) — for client communication</li>
            <li><strong>Payment processors</strong> (e.g. Razorpay, PayPal) — for invoicing and payments</li>
            <li><strong>Project management tools</strong> (e.g. Notion, Linear) — for internal project tracking</li>
            <li><strong>Cloud storage</strong> (e.g. Google Drive) — for storing project files</li>
          </ul>
          <p className={styles.text}>
            All third-party providers are contractually required to handle your data securely and only for the purpose of providing their service to us.
          </p>
          <p className={styles.text}>
            We may disclose your information if required to do so by law or in response to valid legal requests from Indian authorities.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>05</span>
          <h2 className={styles.sectionTitle}>How long we keep your data</h2>
          <ul className={styles.list}>
            <li>Enquiry data (no project started): deleted after 12 months</li>
            <li>Active project data: retained for the duration of the project plus 3 years</li>
            <li>Invoice and payment records: retained for 7 years as required by Indian tax law</li>
            <li>Analytics data: aggregated and anonymised after 12 months</li>
          </ul>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>06</span>
          <h2 className={styles.sectionTitle}>Cookies</h2>
          <p className={styles.text}>
            Our website uses minimal cookies. We use only cookies that are strictly necessary for the site to function (e.g. remembering your preferences). We do not use advertising cookies or cross-site tracking.
          </p>
          <p className={styles.text}>
            You can disable cookies in your browser settings at any time. Note that some parts of the site may not function correctly without them.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>07</span>
          <h2 className={styles.sectionTitle}>Your rights</h2>
          <p className={styles.text}>You have the right to:</p>
          <ul className={styles.list}>
            <li>Request a copy of the personal data we hold about you</li>
            <li>Ask us to correct inaccurate or incomplete data</li>
            <li>Ask us to delete your data (subject to legal retention requirements)</li>
            <li>Withdraw consent to marketing communications at any time</li>
          </ul>
          <p className={styles.text}>
            To exercise any of these rights, email us at <a href="mailto:hello@empathystudio.in">hello@empathystudio.in</a>. We will respond within 30 days.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>08</span>
          <h2 className={styles.sectionTitle}>Data security</h2>
          <p className={styles.text}>
            We take reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. All data is stored on password-protected systems with restricted access. Payment processing is handled entirely by our payment providers — we never store card details.
          </p>
          <p className={styles.text}>
            No method of transmission over the internet is 100% secure. While we do our best to protect your data, we cannot guarantee absolute security.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>09</span>
          <h2 className={styles.sectionTitle}>Changes to this policy</h2>
          <p className={styles.text}>
            We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top. We encourage you to review this page periodically. Continued use of our website or services after any changes constitutes acceptance of the updated policy.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>10</span>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <p className={styles.text}>
            For any privacy-related questions or requests, please contact us at:
          </p>
          <p className={styles.text}>
            <strong>Empathy Studio</strong><br />
            Email: <a href="mailto:hello@empathystudio.in">hello@empathystudio.in</a><br />
            India
          </p>
        </div>

      </div>

      <div className={styles.contactStrip}>
        <div className={styles.contactText}>
          <strong>Have a question about your data?</strong>
          We'll respond within 30 days.
        </div>
        <Link href="/contact" className="btn-ghost">Contact us ↗</Link>
      </div>
    </>
  )
}
