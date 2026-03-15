import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Disclaimer',
}

export default function DisclaimerPage() {
  return (
    <>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.headline}>Dis<em>claimer</em></h1>
        <p className={styles.meta}>Last updated: March 2025 &nbsp;·&nbsp; Empathy Studio, India</p>
      </section>

      <div className={styles.body}>

        <div className={styles.highlight}>
          <strong>Plain language summary</strong>
          This website is for information purposes. While we take our work seriously and stand behind everything we deliver, this disclaimer covers the boundaries of our legal liability as a studio.
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>01</span>
          <h2 className={styles.sectionTitle}>Website information</h2>
          <p className={styles.text}>
            The information on this website is provided for general informational purposes only. While we make every effort to keep the content accurate and current, Empathy Studio makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of any information on this site.
          </p>
          <p className={styles.text}>
            Case studies and work samples displayed on this website represent projects where Empathy Studio contributed creative or technical work. Results shown are specific to the client, context, and goals of each project, and are not a guarantee of similar results for future clients.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>02</span>
          <h2 className={styles.sectionTitle}>Professional advice</h2>
          <p className={styles.text}>
            Nothing on this website constitutes legal, financial, business, or any other form of professional advice. All content is provided for informational and illustrative purposes only.
          </p>
          <p className={styles.text}>
            Any opinions, recommendations, or commentary published on this site or in our journal reflect the views of Empathy Studio and should not be relied upon as definitive guidance for your specific situation.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>03</span>
          <h2 className={styles.sectionTitle}>Results and outcomes</h2>
          <p className={styles.text}>
            Design and development services are creative and technical in nature. While we bring skill, experience, and dedication to every project, Empathy Studio does not guarantee specific business outcomes such as increased revenue, user growth, conversion rates, or search engine rankings as a result of our work.
          </p>
          <p className={styles.text}>
            Business outcomes depend on many factors beyond our control including market conditions, client implementation, third-party services, and audience behaviour.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>04</span>
          <h2 className={styles.sectionTitle}>Third-party links and tools</h2>
          <p className={styles.text}>
            Our website may contain links to external websites or reference third-party tools and services. These links are provided for convenience only. Empathy Studio has no control over the content or availability of those sites and accepts no responsibility for them.
          </p>
          <p className={styles.text}>
            Any mention of third-party products or services does not constitute an endorsement unless explicitly stated.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>05</span>
          <h2 className={styles.sectionTitle}>Intellectual property</h2>
          <p className={styles.text}>
            All content on this website — including text, design, code, images, animations, and branding — is the intellectual property of Empathy Studio unless otherwise credited.
          </p>
          <p className={styles.text}>
            You may not reproduce, distribute, or use any content from this website without prior written permission from Empathy Studio.
          </p>
          <p className={styles.text}>
            Client work shown in our portfolio is displayed with permission. All client-owned intellectual property remains the property of the respective client.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>06</span>
          <h2 className={styles.sectionTitle}>Limitation of liability</h2>
          <p className={styles.text}>
            To the fullest extent permitted by applicable Indian law, Empathy Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with:
          </p>
          <ul className={styles.list}>
            <li>Use of or inability to use this website</li>
            <li>Any errors or omissions in website content</li>
            <li>Any interruption or cessation of transmission to or from the website</li>
            <li>Any bugs, viruses, or malicious code transmitted through the site by third parties</li>
          </ul>
          <p className={styles.text}>
            Our total liability to you in connection with the website shall not exceed INR 1,000 (one thousand rupees).
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>07</span>
          <h2 className={styles.sectionTitle}>Governing law</h2>
          <p className={styles.text}>
            This disclaimer is governed by the laws of India. Any disputes arising in connection with this website shall be subject to the exclusive jurisdiction of the courts of India.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>08</span>
          <h2 className={styles.sectionTitle}>Changes</h2>
          <p className={styles.text}>
            We may update this disclaimer at any time without notice. The current version is always available on this page. Continued use of the website constitutes acceptance of any changes.
          </p>
        </div>

      </div>

      <div className={styles.contactStrip}>
        <div className={styles.contactText}>
          <strong>Questions about this disclaimer?</strong>
          Get in touch and we'll respond promptly.
        </div>
        <Link href="/contact" className="btn-ghost">Contact us ↗</Link>
      </div>
    </>
  )
}
