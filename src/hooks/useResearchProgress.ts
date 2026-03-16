import React, { useState, useEffect } from 'react';
import type { PhaseId, PhaseStatus, StepStatus, Section, Tab } from '../types';
import { ACADEMIC_SECTIONS, RESEARCH_REPORT_SECTIONS } from '../constants';

interface UseResearchProgressParams {
  isResearchInProgress: boolean;
  reportType: string;
  openTabs: Tab[];
  setOpenTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
  setActiveTabId: (id: string) => void;
}

export function useResearchProgress({
  isResearchInProgress,
  reportType,
  openTabs,
  setOpenTabs,
  setActiveTabId,
}: UseResearchProgressParams) {
  const [visiblePhases, setVisiblePhases] = useState<PhaseId[]>([]);
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    thinking: true,
    writing: true,
    polishing: false,
  });
  const [phaseStatuses, setPhaseStatuses] = useState<Record<PhaseId, PhaseStatus>>({
    thinking: 'pending',
    writing: 'pending',
    polishing: 'pending',
  });
  const [sectionStatuses, setSectionStatuses] = useState<Record<string, StepStatus>>({});

  const currentSections: readonly Section[] =
    reportType === 'Research Report' ? RESEARCH_REPORT_SECTIONS : ACADEMIC_SECTIONS;

  const thinkingContent =
    phaseStatuses.thinking === 'completed'
      ? 'Outline completed. Key topics and section order are finalized.'
      : 'Reviewing user intent, extracting constraints, and generating section-level outline...';

  const polishingContent =
    phaseStatuses.polishing === 'completed'
      ? 'Language and structure optimized. Final draft is ready.'
      : 'Improving coherence, transitions, and terminology consistency across all sections...';

  const researchPhases = visiblePhases.map((phaseId) => {
    if (phaseId === 'thinking') {
      return { id: 'thinking' as PhaseId, title: 'Thinking', status: phaseStatuses.thinking, streamContent: thinkingContent };
    }
    if (phaseId === 'writing') {
      return {
        id: 'writing' as PhaseId,
        title: 'Writing',
        status: phaseStatuses.writing,
        sections: currentSections.map((s) => ({ id: s.id, title: s.title, status: sectionStatuses[s.id] ?? ('pending' as StepStatus) })),
      };
    }
    return { id: 'polishing' as PhaseId, title: 'Prepare Workspace', status: phaseStatuses.polishing, streamContent: polishingContent };
  });

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  useEffect(() => {
    if (!isResearchInProgress) return;

    setVisiblePhases(['thinking']);
    setExpandedPhases({ thinking: true, writing: true, polishing: false });
    setPhaseStatuses({ thinking: 'in_progress', writing: 'pending', polishing: 'pending' });

    const activeSections = reportType === 'Research Report' ? RESEARCH_REPORT_SECTIONS : ACADEMIC_SECTIONS;
    const initial = activeSections.reduce<Record<string, StepStatus>>((acc, s) => {
      acc[s.id] = 'pending';
      return acc;
    }, {});
    setSectionStatuses(initial);

    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        setPhaseStatuses((p) => ({ ...p, thinking: 'completed', writing: 'in_progress' }));
        setVisiblePhases((p) => (p.includes('writing') ? p : [...p, 'writing']));
        setSectionStatuses((p) => {
          const next = { ...p };
          activeSections.forEach((s) => { next[s.id] = 'in_progress'; });
          return next;
        });
      }, 2200),
    );

    activeSections.forEach((section, i) => {
      timers.push(
        window.setTimeout(() => {
          setSectionStatuses((p) => ({ ...p, [section.id]: 'completed' }));
        }, 3200 + i * 520),
      );
    });

    timers.push(
      window.setTimeout(() => {
        setPhaseStatuses((p) => ({ ...p, writing: 'completed', polishing: 'in_progress' }));
        setVisiblePhases((p) => (p.includes('polishing') ? p : [...p, 'polishing']));
      }, 3200 + activeSections.length * 520 + 500),
    );

    timers.push(
      window.setTimeout(() => {
        setPhaseStatuses((p) => ({ ...p, polishing: 'completed' }));
        if (reportType === 'Research Report') {
          if (!openTabs.find((t) => t.id === 'research_report_result')) {
            setOpenTabs((prev) => [...prev, { id: 'research_report_result', title: 'Market_Research_Report.pdf', type: 'pdf' }]);
          }
          setActiveTabId('research_report_result');
        } else {
          if (!openTabs.find((t) => t.id === 'agent_review')) {
            setOpenTabs((prev) => [...prev, { id: 'agent_review', title: 'Academic_Survey_Draft.pdf', type: 'pdf' }]);
          }
          setActiveTabId('agent_review');
        }
      }, 3200 + activeSections.length * 520 + 2600),
    );

    return () => { timers.forEach((id) => window.clearTimeout(id)); };
  }, [isResearchInProgress, reportType]);

  return { researchPhases, expandedPhases, phaseStatuses, togglePhase };
}
