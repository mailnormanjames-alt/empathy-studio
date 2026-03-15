import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Cancellation Policy',
}

export default function CancellationPage() {
  return (
    <>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.headline}>Cancellation <em>Policy</em></h1>
        <p className={styles.meta}>Last updated: March 2025 &nbsp;·&nbsp; Empathy Studio, India</p>
      </section>

      <div className={styles.body}>

        <div className={styles.highlight}>
          <strong>The short version</strong>
          All projects require full payment upfront before work begins. Once work has started, payments are non-refundable. If you cancel, you own everything completed up to that point.
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>01</span>
          <h2 className={styles.sectionTitle}>Payment terms</h2>
          <p className={styles.text}>
            Empathy Studio operates on a <strong>full payment upfront</strong> model. Work does not commence on any project until full payment of the agreed project fee has been received and cleared.
          </p>
          <p className={styles.text}>
            For retainer engagements, each monthly payment is due on or before the first day of the service month. Work for that month will not begin until payment is confirmed.
          </p>
          <p className={styles.text}>
            All fees are quoted and invoiced in the currency agreed upon at project commencement. Bank transfer fees, payment processing charges, and currency conversion costs are the responsibility of the client.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>02</span>
          <h2 className={styles.sectionTitle}>Project-based work — cancellation</h2>
          <p className={styles.text}>
            Because all project fees are collected upfront and work begins immediately upon payment confirmation, the following applies if you choose to cancel a fixed-price project:
          </p>
          <ul className={styles.list}>
            <li><strong>Before work begins:</strong> If you cancel your project within 24 hours of payment and before any work has commenced, you are eligible for a full refund, minus any payment processing fees.</li>
            <li><strong>After work has begun:</strong> No refund will be issued. You will receive all work completed up to the point of cancellation, delivered in its current state.</li>
            <li><strong>Partial delivery:</strong> If the project is cancelled mid-way, Empathy Studio retains the right to withhold delivery of final files until all outstanding project communication is formally concluded.</li>
          </ul>
          <p className={styles.text}>
            "Work has begun" means any of the following: research conducted, strategy documents prepared, design concepts initiated, or development work started.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>03</span>
          <h2 className={styles.sectionTitle}>Retainer / monthly contracts — cancellation</h2>
          <p className={styles.text}>
            Retainer agreements require a minimum commitment of <strong>one calendar month</strong>. To cancel a retainer arrangement:
          </p>
          <ul className={styles.list}>
            <li>Written notice of cancellation must be provided at least <strong>30 days</strong> before the next billing date</li>
            <li>The current month's retainer fee is non-refundable regardless of when notice is given</li>
            <li>Any work completed during the final month will be delivered upon conclusion of the engagement</li>
            <li>Retainers cancelled with less than 30 days' notice will be charged for the following month in full</li>
          </ul>
          <p className={styles.text}>
            Cancellation notice must be submitted in writing via email to <a href="mailto:hello@empathystudio.in">hello@empathystudio.in</a> with the subject line "Retainer Cancellation — [Your Company Name]".
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>04</span>
          <h2 className={styles.sectionTitle}>Cancellation by Empathy Studio</h2>
          <p className={styles.text}>
            Empathy Studio reserves the right to cancel or suspend a project under the following circumstances:
          </p>
          <ul className={styles.list}>
            <li>The client requests work that violates applicable law or our ethical standards</li>
            <li>The client is unresponsive for more than 30 consecutive days without prior notice</li>
            <li>The scope of work is expanded significantly beyond the original agreement without new payment being arranged</li>
            <li>The working relationship becomes untenable due to sustained unprofessional conduct</li>
          </ul>
          <p className={styles.text}>
            In the event Empathy Studio cancels a project for reasons not caused by the client, a pro-rata refund will be issued for work not yet completed.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>05</span>
          <h2 className={styles.sectionTitle}>Project pausing</h2>
          <p className={styles.text}>
            If you need to pause a project, please notify us in writing as soon as possible. We will hold your project in queue for up to <strong>60 days</strong>. After 60 days of inactivity without communication, the project may be considered abandoned and no refund will be issued.
          </p>
          <p className={styles.text}>
            Restarting a paused project after 60 days may require a new project agreement and updated pricing to reflect any changes in scope, resource availability, or market rates.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>06</span>
          <h2 className={styles.sectionTitle}>Scope changes</h2>
          <p className={styles.text}>
            Any additions to the agreed project scope (new pages, extra rounds of revisions, new deliverables, change of direction) will be quoted separately and require additional payment before the additional work begins.
          </p>
          <p className={styles.text}>
            Scope changes do not entitle the client to a refund of the original project fee.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>07</span>
          <h2 className={styles.sectionTitle}>Intellectual property on cancellation</h2>
          <p className={styles.text}>
            Upon cancellation of a project where no refund is issued:
          </p>
          <ul className={styles.list}>
            <li>The client owns all <strong>final, delivered</strong> work for which full payment was made</li>
            <li>Empathy Studio retains ownership of all <strong>undelivered, in-progress</strong> work, concepts, and internal working files</li>
            <li>Empathy Studio retains the right to display completed and partially completed work in its portfolio</li>
          </ul>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>08</span>
          <h2 className={styles.sectionTitle}>Dispute resolution</h2>
          <p className={styles.text}>
            In the event of a dispute regarding cancellation, both parties agree to first attempt resolution through good-faith discussion. If a resolution cannot be reached within 30 days, the matter shall be referred to mediation or arbitration under Indian law before any formal legal proceedings are initiated.
          </p>
          <p className={styles.text}>
            This policy is governed by the laws of India. Any legal proceedings shall be conducted in the courts of India.
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionNum}>09</span>
          <h2 className={styles.sectionTitle}>Contact for cancellations</h2>
          <p className={styles.text}>
            All cancellation notices and related communications must be submitted in writing to:
          </p>
          <p className={styles.text}>
            <strong>Empathy Studio</strong><br />
            Email: <a href="mailto:hello@empathystudio.in">hello@empathystudio.in</a><br />
            Please include your project name and invoice number in all correspondence.
          </p>
          <p className={styles.text}>
            Verbal cancellations (phone calls, messages) are not considered valid. Written email confirmation is required.
          </p>
        </div>

      </div>

      <div className={styles.contactStrip}>
        <div className={styles.contactText}>
          <strong>Need to discuss your project?</strong>
          We're always happy to talk things through first.
        </div>
        <Link href="/contact" className="btn-ghost">Contact us ↗</Link>
      </div>
    </>
  )
}
