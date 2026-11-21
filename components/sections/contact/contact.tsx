import styles from './contact.module.css';

import ContactHeader from './header/contact-header';
import ContactContent from './content/contact-content';
import TransmissionDecoration from './decoration/transmission-decoration';
import { SectionReveal } from '@/components/common/section-reveal';

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <TransmissionDecoration />

      <div className={styles.container}>
        <SectionReveal>
          <ContactHeader />
          <ContactContent />

          <footer className={styles.footer}>
            <span>END OF TRANSMISSION</span>
            <span>© 2026 / ALL SYSTEMS OPERATIONAL</span>
          </footer>
        </SectionReveal>
      </div>
    </section>
  );
}