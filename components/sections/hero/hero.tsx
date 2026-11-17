import styles from './hero.module.css';

import Background from './background/background';
import HeroContent from './presentation/content/hero-content';
import HeroActions from './presentation/actions/hero-actions';
import ScrollIndicator from './presentation/scroll/scroll-indicator';

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <Background />

      <div className={styles.contentLayer}>
        <div className={styles.copy}>
          <HeroContent />
          <HeroActions />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}