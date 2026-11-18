import styles from './information-card.module.css';

interface InformationCardProps {
  number: string;
  title: string;
  label: string;
  description: string;
  technologies?: string[];
  highlight?: string;
}

export default function InformationCard({
  number,
  title,
  label,
  description,
  technologies,
  highlight,
}: InformationCardProps) {
  return (
    <article className={styles.informationCard}>
      <div className={styles.cardHeader}>
        <span className={styles.cardNumber}>{number}</span>
        <span className={styles.cardLabel}>{label}</span>
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>

      <p className={styles.cardDescription}>{description}</p>

      {technologies && (
        <div className={styles.technologies}>
          {technologies.map((tech) => (
            <span key={tech} className={styles.technology}>
              {tech}
            </span>
          ))}
        </div>
      )}

      {highlight && (
        <div className={styles.highlight}>
          <span className={styles.highlightValue}>{highlight}</span>
        </div>
      )}
    </article>
  );
}
