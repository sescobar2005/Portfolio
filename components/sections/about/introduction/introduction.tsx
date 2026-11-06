import styles from './introduction.module.css';

export default function Introduction() {
  return (
    <div className={styles.introduction}>
      <span className={styles.sectionLabel}>
        THE EXPLORER
      </span>

      <h3 className={styles.title}>
        Hello, I'm
        <span> Santiago.</span>
      </h3>

      <div className={styles.description}>
        <p>
          I'm a Computer Engineer passionate about understanding
          how technology works and transforming ideas into
          meaningful software solutions.
        </p>

        <p>
          My main interest lies in backend development, software
          architecture and database systems. I enjoy working
          behind the scenes, designing application logic and
          building the foundations that make digital products work.
        </p>

        <p>
          I believe that becoming a good engineer is a continuous
          journey. Every project, challenge and new technology
          is an opportunity to learn, experiment and improve.
        </p>
      </div>

      <div className={styles.signature}>
        <span className={styles.signatureLine} />
        <span>Always exploring. Always building.</span>
      </div>
    </div>
  );
}