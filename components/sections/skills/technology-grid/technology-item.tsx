import styles from './technology-grid.module.css';

interface TechnologyItemProps {
  name: string;
}

export default function TechnologyItem({
  name,
}: TechnologyItemProps) {
  return (
    <span className={styles.technologyItem}>
      <span className={styles.technologyDot} />
      {name}
    </span>
  );
}