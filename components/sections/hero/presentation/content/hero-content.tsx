import styles from './hero-content.module.css';

import WelcomeLabel from './welcome-label';
import HeroTitle from './hero-title';
import HeroDescription from './hero-description';

export default function HeroContent() {
  return (
    <div className={styles.content}>
      <WelcomeLabel />
      <HeroTitle />
      <HeroDescription />
    </div>
  );
}