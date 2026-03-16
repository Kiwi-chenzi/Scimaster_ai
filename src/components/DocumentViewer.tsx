import { useState } from 'react';
import { FileText, X, ChevronDown, Plus, Minus, Maximize2, ArrowDown, ArrowUp, Calendar, Star, FolderPlus } from 'lucide-react';
import type { Tab } from '../types';

interface Props {
  openTabs: Tab[];
  activeTabId: string;
  onTabSelect: (id: string) => void;
  onTabClose: (id: string) => void;
}

export function DocumentViewer({ openTabs, activeTabId, onTabSelect, onTabClose }: Props) {
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(null);
  const activeTab = openTabs.find((t) => t.id === activeTabId);

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col overflow-hidden z-10 border border-gray-100">
      {/* Tabs */}
      <div className="flex items-center border-b border-gray-100 bg-gray-50/50 overflow-x-auto">
        {openTabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => onTabSelect(tab.id)}
            className={`px-4 py-3 border-r border-gray-100 flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors ${
              activeTabId === tab.id
                ? 'bg-white border-t-2 border-t-purple-500 text-gray-900'
                : 'bg-transparent border-t-2 border-t-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <FileText size={14} className={tab.type === 'pdf' ? 'text-red-500' : 'text-blue-500'} />
            <span className="truncate max-w-[150px]">{tab.title}</span>
            <button aria-label="Close tab" onClick={(e) => { e.stopPropagation(); onTabClose(tab.id); }} className="text-gray-400 hover:text-gray-600 ml-1">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      {activeTab?.type !== 'search' && (
        <div className="h-12 border-b border-gray-100 flex items-center px-4 gap-4 text-sm text-gray-600 bg-white flex-shrink-0">
          <button aria-label="Zoom out" className="hover:text-gray-900"><Minus size={14} /></button>
          <button className="flex items-center gap-1 hover:text-gray-900 font-medium">Fit Width <ChevronDown size={14} /></button>
          <button aria-label="Zoom in" className="hover:text-gray-900"><Plus size={14} /></button>
          <div className="w-px h-4 bg-gray-200" />
          <button aria-label="Fullscreen" className="w-8 h-6 rounded bg-[#f3e8ff] text-[#7e22ce] flex items-center justify-center"><Maximize2 size={14} /></button>
          <span className="font-medium">100%</span>
          <span className="text-gray-400">2 pages</span>
          <button aria-label="Scroll down" className="hover:text-gray-900 ml-auto"><ArrowDown size={14} /></button>
        </div>
      )}

      {/* Document Content */}
      <div className={`flex-1 overflow-y-auto relative ${activeTab?.type === 'search' ? 'bg-[#f9fafb]' : 'bg-[#f0f2f5] p-6'}`}>
        {activeTabId === 'welcome' && <WelcomeDoc />}
        {activeTabId === 'free_writing_draft' && <FreeWritingDoc />}
        {activeTabId === 'research_report_result' && <ResearchReportDoc />}
        {activeTabId === 'agent_review' && <AcademicSurveyDoc />}
        {activeTabId === 'agent_workflows' && <SearchResultsDoc expandedPaperId={expandedPaperId} onTogglePaper={setExpandedPaperId} />}
        {activeTabId === 'experiment_data' && <ExperimentDataDoc />}
        {activeTabId === '' && <div className="flex items-center justify-center h-full text-gray-400">No document open</div>}

        {/* Scrollbar Track */}
        <div className="absolute right-2 top-2 bottom-2 w-3 bg-gray-100 rounded-full flex flex-col items-center py-1">
          <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-l-transparent border-r-transparent border-b-gray-400 mb-1" />
          <div className="w-2 h-32 bg-gray-400 rounded-full mt-1" />
          <div className="flex-1" />
          <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-gray-400 mt-1" />
        </div>
      </div>
    </div>
  );
}

function WelcomeDoc() {
  return (
    <div className="bg-white shadow-md border border-gray-200 w-full max-w-[794px] min-h-[1123px] mx-auto p-12 md:p-16 font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-6">欢迎使用 SciMaster</h1>
      <h2 className="text-lg font-bold mb-2">这是你的新一代科研助手。</h2>
      <p className="text-sm text-gray-600 mb-8 pb-6 border-b border-gray-100">这不仅仅是一个写作界面，更是一个整合了你所有研究材料的智能中枢。</p>
      <h2 className="text-lg font-bold mb-4">你现在看到的界面</h2>
      <h3 className="text-base font-bold mb-2">中央文件编辑区</h3>
      <p className="text-sm text-gray-600 mb-2">这是你的主画布，采用基于源码的结构化编辑模式。</p>
      <p className="text-sm text-gray-600 mb-6">你正在编写标准的 LaTeX 源代码，通过命令与环境机制精确控制公式排版、文献引用、图表布局与整体文档结构，实现高度可控的学术级排版效果。</p>
      <h3 className="text-base font-bold mb-2">AI 对话区</h3>
      <p className="text-sm text-gray-600 mb-4">这里集成了 SciMaster 的核心 AI 模块，如 Writer、Tutor 和 Analyzer，方便你随时调用。你可以随时切换三种模式，它们各司其职：</p>
      <div className="space-y-3 mb-6">
        <p className="text-sm text-gray-600"><strong className="text-gray-900">Writer：</strong> 它是你的主笔。无论是从零起草、扩写段落，还是精准润色，它都能基于你提供的参考资料，产出学术性极强的文字。</p>
        <p className="text-sm text-gray-600"><strong className="text-gray-900">Tutor：</strong> 它是你的导师。当你面对空白文档毫无头绪时，开启 Tutor。它会通过多轮对话，以 <strong className="text-gray-900">思维导图 (Mindmap)</strong> 的形式帮你理清论文架构。</p>
        <p className="text-sm text-gray-600"><strong className="text-gray-900">Analyzer：</strong> 它是你的数据分析助手。上传实验数据，它能帮你进行复杂的计算、统计分析，并直接生成可视化的图表。</p>
      </div>
      <div className="w-full h-px bg-gray-100 mb-6" />
      <h3 className="text-base font-bold mb-2">左侧面板</h3>
      <p className="text-sm text-gray-600 mb-4">这里是你的文件中心，分为上方的 <strong className="text-gray-900">项目文件</strong> 和下方的 <strong className="text-gray-900">知识库</strong>。</p>
      <div className="space-y-3">
        <p className="text-sm text-gray-600"><strong className="text-gray-900">项目文件：</strong> 存放你的初稿、Proposal 或实验记录。AI <strong className="text-gray-900">拥有修改权限</strong>，你可以指示它直接在这些文档上进行迭代。</p>
        <p className="text-sm text-gray-600"><strong className="text-gray-900">知识库：</strong> 建议放入参考文献（PDF、文档）。AI 会深度阅读它们作为写作背景，但 <strong className="text-gray-900">绝不会修改</strong> 这些文件，确保资料的完整性。</p>
      </div>
    </div>
  );
}

function FreeWritingDoc() {
  return (
    <div className="bg-white shadow-md border border-gray-200 w-full max-w-[794px] min-h-[1123px] mx-auto p-12 md:p-16 font-serif text-gray-800">
      <h1 className="text-3xl font-bold text-gray-300 mb-6">Untitled Draft</h1>
      <p className="text-gray-400 italic">Start typing here...</p>
    </div>
  );
}

function ResearchReportDoc() {
  return (
    <div className="bg-white shadow-md border border-gray-200 w-full max-w-[794px] min-h-[1123px] mx-auto p-12 md:p-16 font-sans text-gray-800">
      <div className="border-b-2 border-gray-900 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Research Report</h1>
        <h2 className="text-xl text-gray-600">AI Agents: Industry Trends & Opportunities 2024</h2>
      </div>
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Executive Summary</h3>
        <p className="text-sm leading-relaxed text-justify">The autonomous agent market is experiencing a paradigm shift, driven by advancements in Large Language Models (LLMs). This report analyzes the current landscape, identifying key players, emerging technology stacks, and investment opportunities. We project a CAGR of 45% over the next 3 years as agents move from experimental pilots to production workflows.</p>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold text-sm mb-2">Key Drivers</h4>
          <ul className="list-disc list-inside text-xs space-y-1 text-gray-600">
            <li>Cost reduction in reasoning models</li>
            <li>Standardization of tool-use interfaces</li>
            <li>Enterprise demand for automation</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold text-sm mb-2">Major Risks</h4>
          <ul className="list-disc list-inside text-xs space-y-1 text-gray-600">
            <li>Reliability & Hallucination</li>
            <li>Data Privacy concerns</li>
            <li>Regulatory uncertainty</li>
          </ul>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Market Overview</h3>
        <p className="text-sm leading-relaxed text-justify mb-4">The ecosystem is dividing into three distinct layers: Foundation Models (OpenAI, Anthropic), Agent Frameworks (LangChain, AutoGen), and Vertical Applications (Jasper, Harvey).</p>
        <div className="w-full h-40 bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-400 text-xs">[Chart: Market Share by Segment 2024]</div>
      </div>
    </div>
  );
}

function AcademicSurveyDoc() {
  return (
    <div className="bg-white shadow-md border border-gray-200 w-full max-w-[794px] min-h-[1123px] mx-auto p-12 md:p-16 font-serif text-gray-800">
      <h1 className="text-2xl font-bold text-center mb-6">A Survey on Large Language Model based Autonomous Agents</h1>
      <div className="text-center text-sm mb-8 italic">
        <p>Lei Wang, Chen Ma, Xueyang Feng, Zeyu Zhang, Hao Yang, Jingsen Zhang, Zhiyuan Chen, Jiakai Tang, Xu Chen, Yankai Lin, Wayne Xin Zhao, Zhewei Wei, Ji-Rong Wen</p>
      </div>
      <h2 className="text-lg font-bold mb-3 uppercase">Abstract</h2>
      <p className="text-sm text-justify mb-6 leading-relaxed">Large language models (LLMs) have achieved remarkable success, demonstrating significant potential in human-like intelligence. However, they still face limitations in solving complex, real-world tasks. To bridge this gap, researchers have proposed LLM-based autonomous agents...</p>
      <h2 className="text-lg font-bold mb-3 uppercase">1. Introduction</h2>
      <p className="text-sm text-justify mb-4 leading-relaxed">Autonomous agents have long been a prominent research focus in artificial intelligence. Previous research in this field often focuses on training agents with limited knowledge within isolated environments...</p>
      <p className="text-sm text-justify mb-4 leading-relaxed">Recently, through training on vast amounts of web knowledge, LLMs have demonstrated potential in achieving human-level intelligence. This has sparked a surge in studies investigating LLM-based autonomous agents...</p>
      <div className="w-full h-48 bg-gray-50 border border-gray-200 my-6 flex items-center justify-center text-gray-400 text-sm">[Figure 1: The general architecture of LLM-based autonomous agents]</div>
      <h2 className="text-lg font-bold mb-3 uppercase">2. Agent Architecture</h2>
      <p className="text-sm text-justify mb-4 leading-relaxed">The architecture of an LLM-based autonomous agent typically consists of a profiling module, a memory module, a planning module, and an action module...</p>
    </div>
  );
}

function SearchResultsDoc({ expandedPaperId, onTogglePaper }: { expandedPaperId: string | null; onTogglePaper: (id: string | null) => void }) {
  const papers = [
    { id: 'paper1', title: 'Multiscale modeling of inelastic materials with Thermodynamics-based Artificial Neural Networks (TANN)', abstract: 'This paper introduces a novel multiscale modeling framework that integrates thermodynamics-based artificial neural networks (TANN) to predict the inelastic behavior of complex materials, ensuring thermodynamic consistency across scales.', journal: 'Computer Methods in Applied Mechanics and Engineering 398, 115190 (2022)', date: '2021-08-30', arxiv: 'arXiv: 2108.13137' },
    { id: 'paper2', title: 'Learning the solution operator of parametric partial differential equations with physics-informed DeepOnets', abstract: 'We propose a physics-informed DeepONet architecture to learn the solution operator of parametric partial differential equations (PDEs), demonstrating significant improvements in generalization and accuracy.', expandedAbstract: 'Deep operator networks (DeepONets) are receiving increased attention thanks to their demonstrated capability to approximate nonlinear operators between infinite-dimensional Banach spaces. However, despite their remarkable early promise, they typically require large training data-sets consisting of paired input-output observations which may be expensive to obtain...', date: '2021-03-19', arxiv: 'arXiv: 2103.10974' },
    { id: 'paper3', title: 'Unsupervised discovery of interpretable hyperelastic constitutive laws', abstract: 'An unsupervised machine learning approach is presented for discovering interpretable hyperelastic constitutive laws directly from full-field displacement data, without requiring stress measurements.', journal: 'Computer Methods in Applied Mechanics and Engineering', date: '2020-10-26', arxiv: 'arXiv: 2010.13496', impact: '7.3', citations: '239' },
    { id: 'paper4', title: 'A physics-informed 3D surrogate model for elastic fields in polycrystals', abstract: 'This work develops a physics-informed 3D surrogate model capable of accurately predicting elastic fields in polycrystalline materials under various loading conditions.', journal: 'Computer Methods in Applied Mechanics and Engineering', date: '2025-06-01' },
  ];

  return (
    <div className="w-full h-full flex flex-col font-sans text-gray-800">
      <div className="flex items-center justify-between px-8 py-3 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="text-[15px] font-bold text-gray-900">123 <span className="text-gray-500 font-normal text-[13px]">Results</span></div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white text-[13px] rounded-md font-medium">Anytime</button>
            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-[13px] rounded-md transition-colors">Since 2025</button>
            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-[13px] rounded-md transition-colors">Since 2024</button>
            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-[13px] rounded-md transition-colors">Custom Range</button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 space-y-4">
        {papers.map((paper) => (
          <div key={paper.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow group">
            <div className="pt-1 flex-shrink-0">
              <input type="checkbox" aria-label="Select paper" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3
                  className="text-[16px] font-semibold text-blue-700 hover:underline cursor-pointer mb-1.5 leading-snug"
                  onClick={() => paper.expandedAbstract && onTogglePaper(expandedPaperId === paper.id ? null : paper.id)}
                >
                  {paper.title}
                </h3>
                {paper.expandedAbstract && (
                  <button onClick={() => onTogglePaper(expandedPaperId === paper.id ? null : paper.id)} className="text-gray-400 hover:text-gray-600">
                    {expandedPaperId === paper.id ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  </button>
                )}
              </div>
              {expandedPaperId === paper.id && paper.expandedAbstract ? (
                <div className="bg-gray-50 p-3 rounded-lg text-[13px] text-gray-700 mb-3 leading-relaxed">
                  <h4 className="font-semibold mb-1">摘要</h4>
                  {paper.expandedAbstract}
                </div>
              ) : (
                <p className="text-[13px] text-gray-600 mb-3 line-clamp-2 leading-relaxed">{paper.abstract}</p>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
                <div className="flex flex-wrap items-center gap-2">
                  {paper.journal && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-50 text-gray-600 border border-gray-100 text-[11px] font-medium">
                      <FileText size={12} />{paper.journal}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-50 text-gray-600 border border-gray-100 text-[11px] font-medium">
                    <Calendar size={12} />{paper.date}
                  </div>
                  {paper.arxiv && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-50 text-gray-600 border border-gray-100 text-[11px] font-medium">{paper.arxiv}</div>
                  )}
                  {paper.impact && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-50 text-yellow-700 border border-yellow-100 text-[11px] font-medium"><Star size={12} />IF: {paper.impact}</div>
                  )}
                  {paper.citations && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-medium">引用: {paper.citations}</div>
                  )}
                </div>
                <button className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors flex-shrink-0">
                  <FolderPlus size={14} />加入知识库
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperimentDataDoc() {
  return (
    <div className="bg-white shadow-md border border-gray-200 w-full max-w-[794px] min-h-[1123px] mx-auto p-12 md:p-16 font-mono text-gray-800 text-sm">
      <h1 className="text-xl font-bold mb-6 font-sans">experiment_data_v2.csv</h1>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="p-3 font-semibold">id</th>
              <th className="p-3 font-semibold">timestamp</th>
              <th className="p-3 font-semibold">model</th>
              <th className="p-3 font-semibold">accuracy</th>
              <th className="p-3 font-semibold">latency_ms</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100"><td className="p-3">1</td><td className="p-3">2023-10-01 10:00</td><td className="p-3">gpt-4</td><td className="p-3">0.92</td><td className="p-3">1200</td></tr>
            <tr className="border-b border-gray-100"><td className="p-3">2</td><td className="p-3">2023-10-01 10:05</td><td className="p-3">claude-3</td><td className="p-3">0.94</td><td className="p-3">850</td></tr>
            <tr className="border-b border-gray-100"><td className="p-3">3</td><td className="p-3">2023-10-01 10:10</td><td className="p-3">gemini-pro</td><td className="p-3">0.91</td><td className="p-3">920</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
