import { useState } from 'react';
import type { PageId, ActionId, Tab, ChatMessage } from './types';
import { useResearchProgress } from './hooks/useResearchProgress';
import { HomePage } from './components/HomePage';
import { WorkspaceSidebar } from './components/WorkspaceSidebar';
import { ResearchPanel } from './components/ResearchPanel';
import { DefaultChatPanel } from './components/DefaultChatPanel';
import { DocumentViewer } from './components/DocumentViewer';
import { ReportSettingsModal } from './components/ReportSettingsModal';
import { NotificationPrompt } from './components/NotificationPrompt';

export default function App() {
  // Navigation
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedAction, setSelectedAction] = useState<ActionId>(null);

  // Report settings
  const [reportType, setReportType] = useState('');
  const [reportLength, setReportLength] = useState('');
  const [isReportSettingsModalOpen, setIsReportSettingsModalOpen] = useState(false);

  // Research state
  const [isResearchInProgress, setIsResearchInProgress] = useState(false);
  const [researchPrompt, setResearchPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [initialInput, setInitialInput] = useState('');
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);

  // Tabs
  const [openTabs, setOpenTabs] = useState<Tab[]>([{ id: 'welcome', title: 'Welcome_...', type: 'welcome' }]);
  const [activeTabId, setActiveTabId] = useState('welcome');

  // Derived
  const isAcademicSurvey = reportType === 'Academic Survey';
  const isIndustryReport = reportType === 'Research Report';
  const isFreeWriting = reportType === 'Free Writing';
  const isReportSettingsComplete = reportType !== '' && (isIndustryReport || isFreeWriting || reportLength !== '');
  const showResearchPanel = isResearchInProgress || ((isIndustryReport || isAcademicSurvey) && !isFreeWriting);

  // Research progress hook
  const { researchPhases, expandedPhases, phaseStatuses, togglePhase } = useResearchProgress({
    isResearchInProgress,
    reportType,
    openTabs,
    setOpenTabs,
    setActiveTabId,
  });

  // Handlers
  const handleReportTypeSelect = (value: string) => {
    setReportType(value);
    if (value === 'Research Report' || value === 'Free Writing') setReportLength('');
  };

  const handleConfirmReportSettings = () => {
    if (!isReportSettingsComplete) return;
    setIsReportSettingsModalOpen(false);

    if (isFreeWriting) {
      setIsResearchInProgress(false);
      if (!openTabs.find((t) => t.id === 'free_writing_draft')) {
        setOpenTabs((prev) => [...prev, { id: 'free_writing_draft', title: 'Untitled Draft', type: 'welcome' }]);
      }
      setActiveTabId('free_writing_draft');
    } else {
      const greeting = `I can help you generate a ${isIndustryReport ? 'comprehensive industry research report' : 'detailed academic survey'}. Please describe your topic, key questions, or goals. You can also upload reference files for better context.`;
      setChatMessages([{ role: 'ai', content: greeting }]);
      setIsResearchInProgress(false);
    }
    setCurrentPage('project_workspace');
  };

  const handleChatSubmit = () => {
    if (!initialInput.trim()) return;
    setResearchPrompt(initialInput);
    setChatMessages((prev) => [...prev, { role: 'user', content: initialInput }]);
    setIsResearchInProgress(true);
    setInitialInput('');
  };

  const handleSwitchMode = (mode: string) => {
    setReportType(mode);
    if (mode === 'Research Report' || mode === 'Free Writing') setReportLength('');

    if (mode === 'Free Writing') {
      setIsResearchInProgress(false);
      setChatMessages([]);
      if (!openTabs.find((t) => t.id === 'free_writing_draft')) {
        setOpenTabs((prev) => [...prev, { id: 'free_writing_draft', title: 'Untitled Draft', type: 'welcome' }]);
      }
      setActiveTabId('free_writing_draft');
    } else {
      const greeting = `I can help you generate a ${mode === 'Research Report' ? 'comprehensive industry research report' : 'detailed academic survey'}. Please describe your topic, key questions, or goals. You can also upload reference files for better context.`;
      setChatMessages([{ role: 'ai', content: greeting }]);
      setIsResearchInProgress(false);
      setInitialInput('');
    }
  };

  const handleTabClose = (tabId: string) => {
    const newTabs = openTabs.filter((t) => t.id !== tabId);
    setOpenTabs(newTabs);
    if (activeTabId === tabId && newTabs.length > 0) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    } else if (newTabs.length === 0) {
      setActiveTabId('');
    }
  };

  // ─── Home / All Projects Page ───
  if (currentPage !== 'project_workspace') {
    return (
      <>
        <HomePage
          currentPage={currentPage}
          selectedAction={selectedAction}
          onPageChange={setCurrentPage}
          onActionSelect={setSelectedAction}
          onOpenReportSettings={() => setIsReportSettingsModalOpen(true)}
        />
        {isReportSettingsModalOpen && (
          <ReportSettingsModal
            reportType={reportType}
            reportLength={reportLength}
            onSelectType={handleReportTypeSelect}
            onSelectLength={setReportLength}
            onReset={() => { setReportType(''); setReportLength(''); }}
            onClose={() => setIsReportSettingsModalOpen(false)}
            onConfirm={handleConfirmReportSettings}
            canSubmit={isReportSettingsComplete}
          />
        )}
      </>
    );
  }

  // ─── Workspace Page ───
  return (
    <div
      className="h-screen w-full flex font-sans text-[#1f2937] overflow-hidden bg-cover bg-center relative"
      style={{ backgroundImage: 'url(/BACKGROUND.png)' }}
    >
      {showNotificationPrompt && <NotificationPrompt onClose={() => setShowNotificationPrompt(false)} />}

      <WorkspaceSidebar
        onNavigateHome={() => setCurrentPage('home')}
        openTabs={openTabs}
        setOpenTabs={setOpenTabs}
        setActiveTabId={setActiveTabId}
      />

      {/* Main Content Area */}
      <div className="flex-1 h-full flex p-4 gap-4 relative">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col gap-4 z-10">
          {showResearchPanel ? (
            <ResearchPanel
              chatMessages={chatMessages}
              isResearchInProgress={isResearchInProgress}
              researchPhases={researchPhases}
              expandedPhases={expandedPhases}
              phaseStatuses={phaseStatuses}
              reportType={reportType}
              reportLength={reportLength}
              initialInput={initialInput}
              onTogglePhase={togglePhase}
              onInputChange={setInitialInput}
              onSubmit={handleChatSubmit}
              onNotify={() => setShowNotificationPrompt(true)}
              onSwitchMode={handleSwitchMode}
            />
          ) : (
            <DefaultChatPanel />
          )}
        </div>

        {/* Right Panel */}
        <DocumentViewer
          openTabs={openTabs}
          activeTabId={activeTabId}
          onTabSelect={setActiveTabId}
          onTabClose={handleTabClose}
        />
      </div>
    </div>
  );
}
