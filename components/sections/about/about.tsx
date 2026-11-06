import styles from './about.module.css';

import AboutHeader from './header/about-header';
import Introduction from './introduction/introduction';
import Information from './information/information';
import OrbitalDecoration from './decoration/orbital-decoration';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <OrbitalDecoration />

      <div className={styles.container}>
        <AboutHeader />

        <div className={styles.content}>
          <Introduction />
          <Information />
        </div>

        <div className={styles.coordinates}>
          <span>LOCATION: EARTH</span>
          <span>STATUS: EXPLORING</span>
          <span>DESTINATION: BEYOND LIMITS</span>
        </div>
      </div>
    </section>
  );
}