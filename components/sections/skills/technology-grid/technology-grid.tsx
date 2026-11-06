import styles from './technology-grid.module.css';

import BackendCategory from '../categories/backend-category';
import FrontendCategory from '../categories/frontend-category';
import DatabaseCategory from '../categories/database-category';
import ToolsCategory from '../categories/tools-category';

export default function TechnologyGrid() {
  return (
    <div className={styles.grid}>
      <BackendCategory />
      <FrontendCategory />
      <DatabaseCategory />
      <ToolsCategory />
    </div>
  );
}