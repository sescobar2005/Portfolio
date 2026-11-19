import styles from './technology-lab.module.css';

import TechnologyLabHeader from './header/technology-lab-header';
import PersonalIntroduction from './introduction/personal-introduction';
import InformationGrid from './information/information-grid';
import LabDecoration from './decoration/lab-decoration';
import LabFooter from './footer/lab-footer';
import { SectionReveal } from '@/components/common/section-reveal';
export default function TechnologyLab() {
  return (
    <section id="about" className={styles.technologyLab}>
      <LabDecoration />

      <div className={styles.container}>
        <SectionReveal>
          <TechnologyLabHeader />

          <div className={styles.content}>
            <PersonalIntroduction />
            <InformationGrid />
          </div>

          <LabFooter />
        </SectionReveal>
      </div>
    </section>
  );
}
