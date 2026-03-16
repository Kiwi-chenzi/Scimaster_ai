import React, { useRef, useState, useEffect } from 'react';
import { Folder, Clock, BookOpen, Settings, MoreHorizontal, FileText, Upload, Download, Plus, Globe, ChevronDown, ArrowRight, Check } from 'lucide-react';
import { LogoSmall } from './Logo';
import type { PageId, SearchScope, Tab } from '../types';

interface Props {
  onNavigateHome: () => void;
  openTabs: Tab[];
  setOpenTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
  setActiveTabId: (id: string) => void;
}

export function WorkspaceSidebar({ onNavigateHome, openTabs, setOpenTabs, setActiveTabId }: Props) {
  const [searchScope, setSearchScope] = useState<SearchScope>('web');
  const [isSearchScopeDropdownOpen, setIsSearchScopeDropdownOpen] = useState(false);
  const [workspaceHeight, setWorkspaceHeight] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sidebarRef.current) return;
      const rect = sidebarRef.current.getBoundingClientRect();
      const newHeight = ((e.clientY - rect.top) / rect.height) * 100;
      setWorkspaceHeight(Math.min(Math.max(newHeight, 20), 80));
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const openTab = (id: string, title: string, type: Tab['type']) => {
    if (!openTabs.find((t) => t.id === id)) {
      setOpenTabs([...openTabs, { id, title, type }]);
    }
    setActiveTabId(id);
  };

  return (
    <>
      {/* Narrow Icon Sidebar */}
      <div className="w-[50px] h-full bg-[#fcfcfd] border-r border-gray-100 flex flex-col items-center py-4 z-20">
        <button aria-label="Home" onClick={onNavigateHome} className="mb-6 hover:opacity-80 transition-opacity"><LogoSmall /></button>
        <div className="flex flex-col gap-4 w-full items-center">
          <button aria-label="Files" className="w-8 h-8 rounded-lg bg-[#f3e8ff] text-[#7e22ce] flex items-center justify-center"><Folder size={18} /></button>
          <button aria-label="History" className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors"><Clock size={18} /></button>
          <button aria-label="Library" className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors"><BookOpen size={18} /></button>
        </div>
        <div className="flex-1" />
        <div className="flex flex-col gap-4 w-full items-center">
          <button aria-label="Help" className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors">
            <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold">!</div>
          </button>
          <button aria-label="Settings" className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors"><Settings size={18} /></button>
          <button aria-label="Profile" className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-medium">L</button>
        </div>
      </div>

      {/* Secondary Sidebar */}
      <div className="w-[240px] h-full bg-[#fcfcfd] border-r border-gray-100 flex flex-col z-10">
        <div className="h-12 border-b border-gray-100 flex items-center justify-between px-4">
          <span className="font-semibold text-sm">1</span>
          <button aria-label="More options" className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
        </div>

        <div className="flex-1 flex flex-col min-h-0" ref={sidebarRef}>
          {/* Workspace Section */}
          <div className="p-4 flex flex-col min-h-0" style={{ height: `${workspaceHeight}%` }}>
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-2 font-semibold text-sm"><FileText size={16} className="text-gray-500" />Workspace</div>
              <div className="flex items-center gap-2 text-gray-400">
                <button aria-label="New file" className="hover:text-gray-600"><Plus size={14} /></button>
                <button aria-label="New document" className="hover:text-gray-600"><FileText size={14} /></button>
                <button aria-label="Upload" className="hover:text-gray-600"><Upload size={14} /></button>
                <button aria-label="Download" className="hover:text-gray-600"><Download size={14} /></button>
              </div>
            </div>
          </div>

          {/* Resizer */}
          <div className="h-1 w-full cursor-row-resize group relative flex-shrink-0 z-20" onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}>
            <div className={`absolute inset-x-0 top-0 h-px bg-gray-200 transition-colors ${isDragging ? 'bg-purple-500' : 'group-hover:bg-purple-400'}`} />
            <div className="absolute inset-x-0 -top-1.5 -bottom-1.5 z-10" />
          </div>

          {/* Knowledge Section */}
          <div className="flex-1 p-4 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-semibold text-sm"><BookOpen size={16} className="text-gray-500" />Knowledge</div>
              <div className="flex items-center gap-2 text-gray-400">
                <button className="hover:text-gray-600" title="New Folder"><Plus size={14} /></button>
                <button className="hover:text-gray-600" title="New File"><FileText size={14} /></button>
                <button className="hover:text-gray-600" title="Upload File"><Upload size={14} /></button>
                <button className="hover:text-gray-600" title="Download Zip"><Download size={14} /></button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <div className="bg-white rounded-xl border border-gray-200 p-1 shadow-sm flex items-center gap-1.5 relative">
                <div className="relative flex-shrink-0">
                  <button onClick={() => setIsSearchScopeDropdownOpen(!isSearchScopeDropdownOpen)} className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-gray-100 text-[12px] font-medium text-gray-700 transition-colors">
                    {searchScope === 'web' ? <Globe size={14} /> : <BookOpen size={14} />}
                    <span className="truncate max-w-[80px]">{searchScope === 'web' ? 'Web' : 'Paper'}</span>
                    <ChevronDown size={14} className="text-gray-500" />
                  </button>
                  {isSearchScopeDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[200px] bg-white rounded-xl shadow-[0_4px_24px_rgb(0,0,0,0.12)] border border-gray-100 p-1.5 z-50 flex flex-col gap-1">
                      {(['web', 'paper'] as SearchScope[]).map((scope) => (
                        <div
                          key={scope}
                          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${searchScope === scope ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                          onClick={() => { setSearchScope(scope); setIsSearchScopeDropdownOpen(false); }}
                        >
                          <div className="flex items-start gap-2">
                            {scope === 'web' ? <Globe size={16} className={`mt-0.5 flex-shrink-0 ${searchScope === scope ? 'text-blue-600' : 'text-gray-500'}`} /> : <BookOpen size={16} className={`mt-0.5 flex-shrink-0 ${searchScope === scope ? 'text-blue-600' : 'text-gray-500'}`} />}
                            <div className="flex flex-col">
                              <span className={`text-[14px] font-medium leading-tight mb-0.5 ${searchScope === scope ? 'text-blue-700' : 'text-gray-900'}`}>{scope === 'web' ? 'Web' : 'Paper'}</span>
                              <span className="text-[11px] text-gray-500 leading-tight">{scope === 'web' ? 'Best sources from web' : 'Academic articles'}</span>
                            </div>
                          </div>
                          {searchScope === scope && <Check size={16} className="text-blue-600" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="w-px h-4 bg-gray-200 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent border-none outline-none text-[13px] text-gray-800 placeholder:text-gray-500 min-w-0 px-1"
                  onKeyDown={(e) => { if (e.key === 'Enter') openTab('agent_workflows', 'Search: "Agent workflows"', 'search'); }}
                />
                <button aria-label="Search" onClick={() => openTab('agent_workflows', 'Search: "Agent workflows"', 'search')} className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0">
                  <ArrowRight size={14} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Knowledge Files */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 -mx-2 px-2">
              <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 group cursor-pointer transition-colors" onClick={() => openTab('agent_review', '李飞飞的agent综述.pdf', 'pdf')}>
                <input type="checkbox" aria-label="Select agent review" defaultChecked className="w-3.5 h-3.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" onClick={(e) => e.stopPropagation()} />
                <FileText size={14} className="text-blue-500 flex-shrink-0" />
                <span className="text-xs text-gray-700 truncate flex-1" title="李飞飞的agent综述.pdf">李飞飞的agent综述.pdf</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-md bg-purple-50/50 border border-purple-100/50 hover:bg-purple-50 group cursor-pointer mt-1 transition-colors" onClick={() => openTab('agent_workflows', 'Search: "Agent workflows"', 'search')}>
                <input type="checkbox" aria-label="Select search results" defaultChecked className="w-3.5 h-3.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" onClick={(e) => e.stopPropagation()} />
                <Globe size={14} className="text-purple-500 flex-shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-xs text-gray-800 font-medium truncate" title="Search: Agent workflows">Search: "Agent workflows"</span>
                  <span className="text-[10px] text-gray-500">5 sources selected</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 group cursor-pointer transition-colors mt-1" onClick={() => openTab('experiment_data', 'experiment_data_v2.csv', 'pdf')}>
                <input type="checkbox" aria-label="Select experiment data" className="w-3.5 h-3.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" onClick={(e) => e.stopPropagation()} />
                <FileText size={14} className="text-blue-500 flex-shrink-0" />
                <span className="text-xs text-gray-500 truncate flex-1" title="experiment_data_v2.csv">experiment_data_v2.csv</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
