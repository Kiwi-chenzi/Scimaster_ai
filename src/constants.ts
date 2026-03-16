import type { ReportTypeOption, ReportLengthOption, Section, Project } from './types';

export const REPORT_TYPE_OPTIONS: ReportTypeOption[] = [
  {
    value: 'Free Writing',
    label: 'Free Writing',
    description: 'Start with a blank canvas. Best for original manuscripts or unguided drafts.',
  },
  {
    value: 'Academic Survey',
    label: 'Academic Survey',
    description: 'Literature-based overview of academic papers, methods, and research trends.',
  },
  {
    value: 'Research Report',
    label: 'Research Report',
    description: 'Insights from web and industry sources, including markets, companies, and emerging signals.',
  },
];

export const REPORT_LENGTH_OPTIONS: ReportLengthOption[] = [
  {
    value: 'Short version',
    label: 'Short version',
    detail: '3-5 minutes',
    description: 'Rapid structured overview, lighter than deep research',
  },
  {
    value: 'Standard version',
    label: 'Standard version',
    detail: '1-2 hours',
    description: 'Evidence-traced survey draft with balanced depth',
  },
];

export const ACADEMIC_SECTIONS: readonly Section[] = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'vae-architecture', title: 'VAE Architectures for Physics-Informed Learning' },
  { id: 'solid-mechanics', title: 'Applications in Solid Mechanics and Material Identification' },
  { id: 'fluid-mechanics', title: 'Applications in Fluid Mechanics and Turbulence Modeling' },
  { id: 'generative-design', title: 'Generative Design and Data Synthesis' },
  { id: 'health-monitoring', title: 'Structural Health Monitoring and Prognostics' },
  { id: 'future-directions', title: 'Challenges and Future Directions' },
  { id: 'conclusion', title: 'Conclusion and Outlook' },
];

export const RESEARCH_REPORT_SECTIONS: readonly Section[] = [
  { id: 'executive-summary', title: 'Executive Summary' },
  { id: 'market-overview', title: 'Market Overview & Key Trends' },
  { id: 'competitive-landscape', title: 'Competitive Landscape' },
  { id: 'technology-analysis', title: 'Technology Analysis' },
  { id: 'investment-risks', title: 'Investment Risks & Opportunities' },
  { id: 'conclusion', title: 'Conclusion' },
];

export const MOCK_PROJECTS: Project[] = [
  { id: 1, type: 'latex', title: '1', time: '2 hours ago' },
  { id: 2, type: 'document', title: '我想去做agent相关的', time: '2 hours ago' },
  { id: 3, type: 'document', title: '李飞飞的agent综述', time: '7 hours ago' },
  { id: 4, type: 'latex', title: '1. 关于"智能体工作流', time: '7 days ago' },
];
