import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Loader2, Plus, RotateCcw, Minus, ArrowUp, Paperclip, Bell, Check, BarChart2, BookOpen, FileEdit } from 'lucide-react';
import type { ChatMessage, ResearchPhase } from '../types';

interface Props {
  chatMessages: ChatMessage[];
  isResearchInProgress: boolean;
  researchPhases: ResearchPhase[];
  expandedPhases: Record<string, boolean>;
  phaseStatuses: Record<string, string>;
  reportType: string;
  reportLength: string;
  initialInput: string;
  onTogglePhase: (id: string) => void;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onNotify: () => void;
  onSwitchMode: (mode: string, length?: string) => void;
}

const MODE_GROUPS = [
  {
    label: 'Research',
    items: [
      { value: 'Research Report', length: 'Standard version', label: 'Research Report', desc: 'Industry & market analysis', time: '~15 min' }
    ]
  },
  {
    label: 'Academic Survey',
    items: [
      { value: 'Academic Survey', length: 'Short version', label: 'Quick Survey', desc: 'Literature review (Light)', time: '3 min' },
      { value: 'Academic Survey', length: 'Standard version', label: 'Deep Survey', desc: 'Literature review (Comprehensive)', time: '2 hr' }
    ]
  },
  {
    label: 'Writing',
    items: [
      { value: 'Free Writing', length: 'Standard version', label: 'Free Writing', desc: 'Blank canvas, original draft', time: null }
    ]
  }
];

export function ResearchPanel({
  chatMessages,
  isResearchInProgress,
  researchPhases,
  expandedPhases,
  phaseStatuses,
  reportType,
  reportLength,
  initialInput,
  onTogglePhase,
  onInputChange,
  onSubmit,
  onNotify,
  onSwitchMode,
}: Props) {
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const getActiveModeLabel = () => {
    if (reportType === 'Research Report') return 'Research Report';
    if (reportType === 'Free Writing') return 'Free Writing';
    if (reportType === 'Academic Survey') {
      return reportLength === 'Short version' ? 'Quick Survey' : 'Deep Survey';
    }
    return 'Select Mode';
  };

  const getActiveModeIcon = () => {
    if (reportType === 'Research Report') return <BarChart2 size={16} className="text-gray-500" />;
    if (reportType === 'Free Writing') return <FileEdit size={16} className="text-gray-500" />;
    return <BookOpen size={16} className="text-gray-500" />;
  };

  return (
    <div className="flex-1 rounded-2xl bg-white/80 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-12 border-b border-gray-100 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2 font-bold text-sm">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#d8b4fe]" />
            <div className="w-2 h-2 rounded-full bg-[#c084fc]" />
          </div>
          SciMaster
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <button aria-label="New chat" className="hover:text-gray-600"><Plus size={16} /></button>
          <button aria-label="Reset" className="hover:text-gray-600"><RotateCcw size={16} /></button>
          <button aria-label="Minimize" className="hover:text-gray-600"><Minus size={16} /></button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        {/* Chat Messages */}
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-start gap-3'}`}>
            {msg.role === 'ai' && (
              <img src="/sci图标.svg" alt="SciMaster" className="w-7 h-7 rounded-md flex-shrink-0 mt-0.5" />
            )}
            <div className={
              msg.role === 'user'
                ? 'max-w-[75%] bg-[#f9fafb] border border-gray-200 rounded-2xl rounded-tr-md px-4 py-3 text-[14px] text-gray-800 leading-relaxed'
                : 'max-w-[80%] text-[14px] text-gray-800 leading-relaxed'
            }>
              {msg.role === 'ai' && idx === 0 && (
                <p className="font-medium mb-1 text-[#8b5cf6]">Hi, I'm SciMaster.</p>
              )}
              <p>{msg.content}</p>
            </div>
          </div>
        ))}

        {/* Research Phases */}
        {isResearchInProgress && (
          <div className="space-y-4 pt-4 border-t border-gray-50 mt-4">
            {researchPhases.map((phase) => {
              const isPhaseExpanded = expandedPhases[phase.id];
              const accentClass = phase.status === 'completed' ? 'bg-[#8b5cf6]' : phase.status === 'in_progress' ? 'bg-[#f59e0b]' : 'bg-gray-200';

              return (
                <div key={phase.id} className="flex gap-3">
                  <div className={`w-[3px] mt-1 mb-1 rounded-sm ${accentClass}`} />
                  <div className="flex-1 min-w-0">
                    <button onClick={() => onTogglePhase(phase.id)} className="flex items-center gap-2 w-full text-left group py-1">
                      <span className="text-[17px] text-[#8b5cf6] font-medium tracking-tight">{phase.title}</span>
                      <span className="text-[#8b5cf6] opacity-70 mt-0.5">
                        {isPhaseExpanded ? <ChevronUp size={18} strokeWidth={2.5} /> : <ChevronDown size={18} strokeWidth={2.5} />}
                      </span>
                      {phase.status === 'in_progress' && <Loader2 size={16} className="text-[#f59e0b] animate-spin ml-1" />}
                    </button>

                    {isPhaseExpanded && phase.streamContent && (
                      <div className="mt-2 mb-2">
                        <p className="text-[15px] text-gray-700 leading-relaxed">{phase.streamContent}</p>
                      </div>
                    )}

                    {isPhaseExpanded && phase.sections && (
                      <div className="mt-2 mb-2 rounded-lg border border-gray-200 bg-white shadow-[0_1px_3px_rgb(0,0,0,0.02)] overflow-hidden">
                        <div className="flex flex-col py-2">
                          {phase.sections.map((step) => {
                            const stepText = step.status === 'completed' ? 'Done' : step.status === 'in_progress' ? 'Writing' : 'Pending';
                            const stepClass = step.status === 'completed' ? 'text-gray-500' : step.status === 'in_progress' ? 'text-[#f59e0b]' : 'text-gray-400';
                            return (
                              <div key={step.id} className="px-5 py-2 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <p className="text-[14px] text-gray-800">{step.title}</p>
                                    {step.status === 'in_progress' && <Loader2 size={13} className="text-[#f59e0b] animate-spin" />}
                                  </div>
                                  <span className={`text-[13px] ${stepClass}`}>{stepText}</span>
                                </div>
                                {step.status !== 'pending' && step.streamBlocks && step.streamBlocks.length > 0 && (
                                  <div className="mt-2 ml-1 rounded-lg border border-gray-100 bg-[#fcfcfd] px-3 py-2.5 space-y-2">
                                    {step.streamBlocks.map((block, blockIdx) => (
                                      block.type === 'tool' ? (
                                        <div key={`${step.id}-tool-${blockIdx}`} className="flex items-center gap-2 flex-wrap">
                                          <span className="inline-flex items-center rounded-full border border-[#ddd6fe] bg-[#f5f3ff] px-2 py-0.5 text-[10px] font-semibold text-[#6d28d9]">
                                            Tool Call
                                          </span>
                                          <span className="inline-flex items-center rounded-full border border-[#e5e7eb] bg-white px-2 py-0.5 text-[10px] font-medium text-gray-600">
                                            {block.content}
                                          </span>
                                        </div>
                                      ) : (
                                        <p key={`${step.id}-text-${blockIdx}`} className="text-[12px] leading-5 text-gray-600">
                                          {block.content}
                                        </p>
                                      )
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Loading dots */}
        {isResearchInProgress && researchPhases.some((p) => p.status === 'in_progress') && (
          <div className="flex flex-col gap-3 pl-2 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 pl-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c084fc] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2.5 h-2.5 rounded-full bg-[#a78bfa] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2.5 h-2.5 rounded-full bg-[#d8b4fe] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[14px] text-[#8b5cf6] font-medium tracking-tight">Estimated time: ~15 minutes</span>
            </div>
            <div className="flex items-center flex-wrap gap-2 mt-1">
              <span className="text-[13px] text-gray-500 leading-relaxed">
                You can safely leave this page or start a new chat. We can notify you once it's ready:
              </span>
              <button onClick={onNotify} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e9d5ff] bg-[#fcfaff] hover:bg-[#f3e8ff] transition-colors text-[#7c3aed] group shadow-sm">
                <Bell size={13} className="text-[#8b5cf6] group-hover:text-[#7c3aed]" />
                <span className="text-[12px] font-medium">Notify me</span>
              </button>
            </div>
          </div>
        )}

        {isResearchInProgress && phaseStatuses.polishing === 'completed' && (
          <div className="pt-2 pl-1 pr-4">
            <p className="text-[14px] text-[#8b5cf6]">
              {reportType === 'Research Report'
                ? 'Market Research Report: AI Agents in 2024 is ready'
                : 'Advances of Variational Autoencoder Models in Mechanics: A Report is ready'}
            </p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
        {isResearchInProgress ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 flex items-center gap-3 opacity-60">
            <input type="text" placeholder="Generating report... please wait" disabled className="w-full bg-transparent border-none outline-none text-sm text-gray-400 placeholder:text-gray-400 cursor-not-allowed" />
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <ArrowUp size={14} className="text-white" strokeWidth={3} />
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-3 flex flex-col gap-3 shadow-sm focus-within:border-[#8b5cf6] focus-within:ring-1 focus-within:ring-[#8b5cf6] transition-all">
            <textarea
              value={initialInput}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                reportType === 'Research Report' ? 'Describe your research topic...' :
                reportType === 'Free Writing' ? 'Start writing...' :
                'Describe your survey topic...'
              }
              className="w-full bg-transparent border-none outline-none text-[14px] text-gray-800 placeholder:text-gray-400 resize-none min-h-[60px]"
            />
            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors text-xs">
                  <Paperclip size={14} />
                  <span>Add reference</span>
                </button>
                <div className="h-4 w-px bg-gray-200 mx-1" />
                <div className="relative">
                  <button
                    onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-md transition-colors group"
                  >
                    {getActiveModeIcon()}
                    <span className="text-[14px] font-medium text-gray-700 group-hover:text-gray-900">{getActiveModeLabel()}</span>
                    <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600" />
                  </button>

                  {isModeDropdownOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-[300px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-2 z-50 max-h-[400px] overflow-y-auto">
                      {MODE_GROUPS.map((group, groupIdx) => (
                        <div key={group.label} className={groupIdx > 0 ? 'mt-2 pt-2 border-t border-gray-50' : ''}>
                          <div className="px-2 py-1.5 text-xs font-medium text-gray-500">{group.label}</div>
                          <div className="space-y-0.5">
                            {group.items.map((opt) => {
                              const isActive = reportType === opt.value && (!opt.length || opt.length === reportLength || opt.value === 'Free Writing');
                              return (
                                <button
                                  key={`${opt.value}-${opt.length}`}
                                  onClick={() => {
                                    onSwitchMode(opt.value, opt.length);
                                    setIsModeDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
                                    isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className={`text-[13px] font-medium ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>{opt.label}</span>
                                      {opt.time && <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{opt.time}</span>}
                                    </div>
                                    <div className="text-[11px] text-gray-400 mt-0.5 leading-tight">{opt.desc}</div>
                                  </div>
                                  {isActive && <Check size={14} className="text-gray-900 flex-shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                aria-label="Send"
                onClick={onSubmit}
                disabled={!initialInput.trim()}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  initialInput.trim() ? 'bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-md' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ArrowUp size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
