import styles from './contact-header.module.css';

export default function ContactHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.statusDot} />
        04 / LET'S CONNECT
      </p>

      <h2 className={styles.title}>
        Have a project
        <span> in mind?</span>
      </h2>

      <p className={styles.subtitle}>
        Every great idea starts with a conversation.
        Let's connect and see what we can build together.
      </p>
    </header>
  );
}