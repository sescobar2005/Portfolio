import styles from './contact.module.css';

import ContactHeader from './header/contact-header';
import ContactContent from './content/contact-content';
import TransmissionDecoration from './decoration/transmission-decoration';

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <TransmissionDecoration />

      <div className={styles.container}>
        <ContactHeader />
        <ContactContent />

        <footer className={styles.footer}>
          <span>END OF TRANSMISSION</span>
          <span>DESIGNED & BUILT BY SANTIAGO ESCOBAR</span>
          <span>© 2026 / ALL SYSTEMS OPERATIONAL</span>
        </footer>
      </div>
    </section>
  );
}