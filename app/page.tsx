'use client';

import { useCallback, useEffect, useRef } from 'react';

import TechnologyLab from '@/components/sections/technology-lab/technology-lab';
import Contact from '@/components/sections/contact/contact';
import Hero from '@/components/sections/hero/hero';
import Projects from '@/components/sections/projects/projects';
import Skills from '@/components/sections/skills/skills';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact'];

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const activeHashRef = useRef<string>('');
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateUrlHash = useCallback((sectionId: string) => {
    const newHash = sectionId === 'home' ? '' : `#${sectionId}`;

    if (activeHashRef.current === newHash) return;

    activeHashRef.current = newHash;

    const url = newHash
      ? `${window.location.pathname}#${newHash.slice(1)}`
      : window.location.pathname;

    history.replaceState(null, '', url);
  }, []);

  const scrollToSection = useCallback((targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    isProgrammaticScrollRef.current = true;

    const shouldReduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    element.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    const hash = targetId === 'home' ? '' : `#${targetId}`;
    activeHashRef.current = hash;
    history.replaceState(
      null,
      '',
      hash
        ? `${window.location.pathname}#${hash.slice(1)}`
        : window.location.pathname
    );

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 800);
  }, []);

  useEffect(() => {
    // Prevent the browser from restoring scroll position on reload.
    // Always start from the top so the Hero is the first thing seen.
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    // Ensure the URL starts at the root without any section hash.
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }

    const initialHash = window.location.hash.slice(1);
    if (initialHash && SECTION_IDS.includes(initialHash)) {
      const element = document.getElementById(initialHash);
      if (element) {
        isProgrammaticScrollRef.current = true;
        const shouldReduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;
        element.scrollIntoView({
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }
      activeHashRef.current = initialHash === 'home' ? '' : `#${initialHash}`;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return;

        const intersecting = entries.filter((entry) => entry.isIntersecting);

        if (intersecting.length === 0) return;

        const bestEntry = intersecting.reduce((a, b) =>
          a.intersectionRatio > b.intersectionRatio ? a : b
        );

        updateUrlHash(bestEntry.target.id);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
      }
    );

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    const handleClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest(
        'a[href^="#"]'
      );
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const targetId = href.slice(1);
      if (!SECTION_IDS.includes(targetId)) return;

      event.preventDefault();
      scrollToSection(targetId);
    };

    document.addEventListener('click', handleClick);

    return () => {
      observerRef.current?.disconnect();
      document.removeEventListener('click', handleClick);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <main>
      <Hero />
      <TechnologyLab />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
