'use client';

import { useState } from 'react';
import {
  LayoutGroup,
  motion,
  useReducedMotion,
} from 'motion/react';

import type { Project } from '../data/projects-data';
import FeaturedMission from '../featured/featured-mission';

import styles from './mission-control.module.css';

interface MissionControlProps {
  projects: Project[];
}

export default function MissionControl({
  projects,
}: MissionControlProps) {
  const [selectedProjectId, setSelectedProjectId] = useState(
    () =>
      projects.find((project) => project.featured)?.id ??
      projects[0]?.id ??
      '',
  );

  const [savedProjectIds, setSavedProjectIds] = useState<string[]>([]);

  const shouldReduceMotion = useReducedMotion();

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId,
  );

  const transition = shouldReduceMotion
    ? { duration: 0.01 }
    : {
        type: 'spring' as const,
        stiffness: 125,
        damping: 25,
        mass: 1.2,
      };

  function handleProjectSelection(projectId: string) {
    if (projectId === selectedProjectId) {
      return;
    }

    // Save the project that is currently open.
    setSavedProjectIds((currentIds) =>
      currentIds.includes(selectedProjectId)
        ? currentIds
        : [...currentIds, selectedProjectId],
    );

    setSelectedProjectId(projectId);
  }

  if (!selectedProject) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyCode}>
          NO MISSIONS AVAILABLE
        </span>

        <p>New expeditions are being prepared.</p>
      </div>
    );
  }

  return (
    <LayoutGroup id="projects-mission-control">
      <div className={styles.missionControl}>
        <div className={styles.panelStage}>
          <motion.div
            key={selectedProject.id}
            layoutId={`mission-surface-${selectedProject.id}`}
            className={styles.missionPanel}
            transition={transition}
          >
            <motion.div
              layoutId={`mission-artifact-${selectedProject.id}`}
              className={styles.missionArtifact}
              transition={transition}
            >
              <FeaturedMission project={selectedProject} />
            </motion.div>
          </motion.div>
        </div>

        <nav
          className={styles.selector}
          aria-label="Select a project"
        >
          <div className={styles.selectorHeader}>
            <span className={styles.selectorLabel}>
              SELECT EXPEDITION
            </span>

            <span className={styles.selectorCount}>
              {String(projects.length).padStart(2, '0')} MISSIONS
            </span>
          </div>

          <div className={styles.missionList}>
            {projects.map((project) => {
              const isSelected =
                project.id === selectedProject.id;

              const isSaved =
                savedProjectIds.includes(project.id) &&
                !isSelected;

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  className={`${styles.missionButton} ${
                    isSelected ? styles.selected : ''
                  }`}
                  onClick={() =>
                    handleProjectSelection(project.id)
                  }
                  aria-pressed={isSelected}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -2 }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 0.985 }
                  }
                  transition={{
                    duration: 0.2,
                    ease: 'easeOut',
                  }}
                >
                  {!isSelected && (
                    <motion.span
                      layoutId={`mission-surface-${project.id}`}
                      className={styles.missionButtonSurface}
                      transition={transition}
                      aria-hidden="true"
                    />
                  )}

                  <span
                    className={styles.folderGlyph}
                    aria-hidden="true"
                  >
                    <span />
                  </span>

                  {isSaved && (
                    <motion.span
                      layoutId={`mission-artifact-${project.id}`}
                      className={styles.savedFile}
                      transition={transition}
                      aria-hidden="true"
                    >
                      <span className={styles.savedFileFold} />
                      <span className={styles.savedFileLines} />
                    </motion.span>
                  )}

                  <span className={styles.missionNumber}>
                    {project.number}
                  </span>

                  <span className={styles.missionName}>
                    {project.name}
                  </span>

                  <span className={styles.missionIndicator}>
                    {isSelected ? 'OPEN' : 'VIEW MISSION'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </nav>
      </div>
    </LayoutGroup>
  );
}