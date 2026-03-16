import { Globe, PlusCircle, Home, Folder, Gift, Settings, Search, MoreHorizontal, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import type { PageId, ActionId } from '../types';
import { MOCK_PROJECTS } from '../constants';

interface Props {
  currentPage: PageId;
  selectedAction: ActionId;
  onPageChange: (page: PageId) => void;
  onActionSelect: (action: ActionId) => void;
  onOpenReportSettings: () => void;
}

export function HomePage({ currentPage, selectedAction, onPageChange, onActionSelect, onOpenReportSettings }: Props) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-r from-[#fdfcff] to-[#eefafc] font-sans text-[#1f2937]">
      {/* Header */}
      <header className="h-[60px] w-full sticky top-0 z-20 px-6 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="px-2 py-0.5 rounded-md bg-[#f3e8ff] text-[#7e22ce] text-xs font-semibold tracking-wide">Beta</div>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-8 px-3 rounded-full border border-gray-200 bg-gray-50/50 text-gray-600 text-sm font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors"><Globe size={14} />English</button>
          <button className="h-8 px-3 rounded-full border border-gray-200 bg-gray-50/50 text-gray-600 text-sm font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors"><PlusCircle size={14} className="text-[#9333ea]" />1000</button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside className="hidden md:flex w-[260px] h-[calc(100vh-60px)] sticky top-[60px] bg-[#fcfcfd] border-r border-gray-100 pt-6 px-4 pb-6 flex-col z-10">
          <button onClick={() => onPageChange('project_workspace')} className="w-full h-10 rounded-full border border-[#d8b4fe] bg-white text-[#9333ea] text-sm font-medium flex items-center justify-center hover:bg-purple-50 transition-colors">
            <span className="mr-2 text-lg leading-none">+</span> New Project
          </button>
          <nav className="mt-6 flex flex-col gap-1">
            <button onClick={() => onPageChange('home')} className={`h-10 rounded-lg px-3 flex items-center gap-3 transition-colors ${currentPage === 'home' ? 'bg-[#f3e8ff] text-[#7e22ce]' : 'bg-transparent text-gray-500 hover:bg-gray-100'}`}>
              <Home size={18} /><span className="text-sm font-medium">Home</span>
            </button>
            <button onClick={() => onPageChange('all_projects')} className={`h-10 rounded-lg px-3 flex items-center gap-3 transition-colors ${currentPage === 'all_projects' ? 'bg-[#f3e8ff] text-[#7e22ce]' : 'bg-transparent text-gray-500 hover:bg-gray-100'}`}>
              <Folder size={18} /><span className="text-sm font-medium">All Projects</span>
            </button>
          </nav>
          <div className="mt-6 rounded-xl bg-gradient-to-b from-[#f5f3ff] to-[#ede9fe] p-4 relative">
            <h3 className="text-sm text-gray-700 font-medium">Redeem Invitation Code</h3>
            <p className="text-xs text-[#8b5cf6] mt-1">Get 1000 credits to use!</p>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b5cf6]"><Gift size={24} strokeWidth={1.5} /></div>
          </div>
          <div className="flex-1" />
          <button className="h-11 rounded-xl bg-gradient-to-r from-[#67e8f9] to-[#a78bfa] text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity">Turn your feedback into rewards!</button>
          <div className="mt-6 flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gray-600 text-white text-sm flex items-center justify-center font-medium">L</div>
            <span className="flex-1 text-sm text-gray-700 font-medium truncate">Lingchen</span>
            <button aria-label="Settings" className="text-gray-400 hover:text-gray-600 transition-colors"><Settings size={18} /></button>
          </div>
        </aside>

        {/* Main Panel */}
        <main className={`flex-1 flex flex-col pt-10 px-8 pb-12 relative z-10 ${currentPage === 'home' ? 'items-center' : 'items-stretch'}`}>
          {currentPage === 'home' ? (
            <>
              <div className="text-center flex flex-col items-center max-w-3xl w-full mt-6">
                <h1 className="font-serif text-[56px] font-bold leading-tight text-[#2a2136]">Meet Your AI Scientist Friend</h1>
                <p className="text-lg text-gray-500 mt-4">Search, ideate, compute, experiment, write —— seamlessly unified</p>
              </div>

              <div className="mt-10 w-full max-w-[800px] grid grid-cols-2 gap-4">
                <button
                  onClick={() => onActionSelect(selectedAction === 'idea_brainstorming' ? null : 'idea_brainstorming')}
                  className={`text-left rounded-2xl border p-6 transition-all hover:shadow-md ${selectedAction === 'idea_brainstorming' ? 'border-[#c084fc] bg-[#faf5ff] shadow-[0_4px_16px_rgba(139,92,246,0.12)]' : 'border-gray-200/80 bg-white/90 hover:border-gray-300'}`}
                >
                  <div className="flex items-center gap-3 mb-3"><span className="text-[28px]">💡</span><h3 className="text-[18px] font-bold text-[#1e1b4b]">Spark idea</h3></div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">Iterate on concepts, build structures, and find novel angles.</p>
                </button>
                <button
                  onClick={() => { onActionSelect('deep_survey'); onOpenReportSettings(); }}
                  className={`text-left rounded-2xl border p-6 transition-all hover:shadow-md ${selectedAction === 'deep_survey' ? 'border-[#c084fc] bg-[#faf5ff] shadow-[0_4px_16px_rgba(139,92,246,0.12)]' : 'border-gray-200/80 bg-white/90 hover:border-gray-300'}`}
                >
                  <div className="flex items-center gap-3 mb-3"><span className="text-[28px]">🔍</span><h3 className="text-[18px] font-bold text-[#1e1b4b]">Synthesize Draft</h3></div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">Synthesize literature reviews or generate instant, data-rich survey reports from your sources.</p>
                </button>
              </div>

              <div className="mt-16 w-full max-w-[800px] rounded-2xl bg-white/80 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-base font-bold text-gray-900">Recent projects</h2>
                  <div className="w-64 h-9 rounded-lg border border-gray-200 bg-white px-3 flex items-center gap-2">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="Search workspace..." className="bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-400 w-full" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="py-4 flex items-center justify-between border-b border-gray-100"><span className="text-sm text-gray-800">1</span><span className="text-sm text-gray-400">2 hours ago</span></div>
                  <div className="py-4 flex items-center justify-between border-b border-gray-100"><span className="text-sm text-gray-800">我想去做agent相关的</span><span className="text-sm text-gray-400">2 hours ago</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full max-w-[1200px] mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-[22px] font-bold text-[#1f2937]">Recent Projects</h1>
                <button className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-colors">Date created (newest) <ChevronDown size={14} className="text-gray-400" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {MOCK_PROJECTS.map((project) => (
                  <div key={project.id} onClick={() => onPageChange('project_workspace')} className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all cursor-pointer">
                    <div className="h-[160px] bg-[#f4f5f7] flex items-center justify-center text-gray-400 text-sm font-medium">{project.type}</div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1"><h3 className="font-semibold text-[15px] text-gray-900 truncate pr-2">{project.title}</h3><button aria-label="More options" className="text-gray-400 hover:text-gray-600 flex-shrink-0"><MoreHorizontal size={16} /></button></div>
                      <p className="text-[13px] text-gray-500">{project.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
