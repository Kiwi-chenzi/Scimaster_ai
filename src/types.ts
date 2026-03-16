export type PageId = 'home' | 'all_projects' | 'project_workspace';
export type ActionId = 'idea_brainstorming' | 'deep_survey' | null;
export type PhaseId = 'thinking' | 'writing' | 'polishing';
export type PhaseStatus = 'completed' | 'in_progress' | 'pending';
export type StepStatus = 'completed' | 'in_progress' | 'pending';
export type SearchScope = 'web' | 'paper';

export interface Tab {
  id: string;
  title: string;
  type: 'welcome' | 'pdf' | 'search';
}

export interface ChatMessage {
  role: 'ai' | 'user';
  content: string;
}

export interface Section {
  readonly id: string;
  readonly title: string;
}

export interface ResearchPhase {
  id: PhaseId;
  title: string;
  status: PhaseStatus;
  streamContent?: string;
  sections?: { id: string; title: string; status: StepStatus }[];
}

export interface ReportTypeOption {
  value: string;
  label: string;
  description: string;
}

export interface ReportLengthOption {
  value: string;
  label: string;
  detail: string;
  description: string;
}

export interface Project {
  id: number;
  type: string;
  title: string;
  time: string;
}
