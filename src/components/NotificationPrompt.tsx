import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function NotificationPrompt({ onClose }: Props) {
  return (
    <>
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-[90] animate-in fade-in duration-200" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[560px] bg-white rounded-[28px] shadow-[0_20px_60px_rgb(0,0,0,0.08)] p-10 font-sans animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-[26px] font-bold text-[#1a153a] tracking-tight">Report Generated Successfully</h2>
          <button aria-label="Close" onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors mt-1"><X size={26} strokeWidth={1} /></button>
        </div>
        <div className="mb-10">
          <p className="text-[17px] text-[#52525b] leading-[1.65]">
            Your report has been generated through systematic process.<br />
            Would you like us to open the related workspace file for you?<br />
            You may also access it anytime in the sidebar under "XXX."
          </p>
        </div>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 rounded-[16px] border-[1.5px] border-[#1a153a] bg-white text-[#1a153a] text-[17px] font-bold hover:bg-gray-50 transition-colors">Open Later</button>
          <button onClick={onClose} className="flex-1 py-4 rounded-[16px] bg-[#f4f2ff] text-[#8b5cf6] text-[17px] font-bold hover:bg-[#eae6ff] transition-colors">Open Project</button>
        </div>
      </div>
    </>
  );
}
