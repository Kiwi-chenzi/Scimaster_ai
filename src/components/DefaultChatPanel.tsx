import { useState } from 'react';
import { Plus, RotateCcw, Minus, ChevronDown, ArrowUp, BookOpen, BarChart2 } from 'lucide-react';

export function DefaultChatPanel() {
  const [isWriterDropdownOpen, setIsWriterDropdownOpen] = useState(false);

  return (
    <>
      {/* Editor Area */}
      <div className="flex-1 rounded-2xl bg-white/60 border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] backdrop-blur-xl p-6 flex flex-col">
        <div className="font-semibold text-sm mb-4">Editor</div>
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          Select a project file, or start chatting with SciMaster!
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-[320px] rounded-2xl bg-white/80 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl flex flex-col overflow-hidden">
        <div className="h-12 border-b border-gray-100 flex items-center justify-between px-4">
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

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f3e8ff] to-[#e0f2fe] flex items-center justify-center mb-4 shadow-inner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19L19 12L22 15L15 22L12 19Z" fill="white"/>
              <path d="M2 22L5 19L2 16L2 22Z" fill="white"/>
              <path d="M19 12L12 5L9 8L16 15L19 12Z" fill="white"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Hi, I am Writer</h2>
          <p className="text-sm text-gray-400">Your dedicated partner for smarter, faster writing</p>
        </div>

        <div className="p-4 bg-white">
          <div className="rounded-xl border border-gray-200 bg-white p-3 flex flex-col gap-3">
            <input type="text" placeholder="What do you want to write today?" className="w-full bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-400" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                <div className="relative">
                  <button onClick={() => setIsWriterDropdownOpen(!isWriterDropdownOpen)} className="flex items-center gap-1 hover:text-gray-900">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    Writer <ChevronDown size={12} />
                  </button>
                  {isWriterDropdownOpen && (
                    <div className="absolute bottom-full left-0 mb-3 w-[320px] bg-white rounded-xl shadow-[0_4px_24px_rgb(0,0,0,0.12)] border border-gray-100 p-2 flex flex-col gap-1 z-50">
                      <button className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                        <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-600"><BookOpen size={16} /></div>
                        <div><div className="font-semibold text-gray-900 text-[15px] mb-0.5">Tutor</div><div className="text-[13px] text-gray-500">From ideas to structured mindmap</div></div>
                      </button>
                      <button className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 transition-colors text-left">
                        <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center flex-shrink-0 text-gray-700">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        </div>
                        <div><div className="font-semibold text-gray-900 text-[15px] mb-0.5">Writer</div><div className="text-[13px] text-gray-500">Partner for smarter and faster writing</div></div>
                      </button>
                      <button className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                        <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-600"><BarChart2 size={16} /></div>
                        <div><div className="font-semibold text-gray-900 text-[15px] mb-0.5">Analyzer</div><div className="text-[13px] text-gray-500">Data analysis, calculation, visualization</div></div>
                      </button>
                    </div>
                  )}
                </div>
                <button className="flex items-center gap-1 hover:text-gray-900">claude-4.6 <ChevronDown size={12} /></button>
              </div>
              <button aria-label="Send" className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                <ArrowUp size={14} className="text-white" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
