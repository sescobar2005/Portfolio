import styles from './contact-header.module.css';

export default function ContactHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.statusDot} />
        04 / TRANSMISSION CHANNEL
      </p>

      <h2 className={styles.title}>
        Have a project
        <span> in mind?</span>
      </h2>

      <p className={styles.subtitle}>
        Every great system starts with a conversation.
        Let's connect and explore what we can build together.
      </p>

      <div className={styles.metadata}>
        <span>COMMUNICATION SYSTEM</span>
        <span>CHANNEL STATUS: ONLINE</span>
      </div>
    </header>
  );
}