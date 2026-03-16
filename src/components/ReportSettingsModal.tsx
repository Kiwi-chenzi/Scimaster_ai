import { Check } from 'lucide-react';
import { REPORT_TYPE_OPTIONS, REPORT_LENGTH_OPTIONS } from '../constants';

interface Props {
  reportType: string;
  reportLength: string;
  onSelectType: (value: string) => void;
  onSelectLength: (value: string) => void;
  onReset: () => void;
  onClose: () => void;
  onConfirm: () => void;
  canSubmit: boolean;
}

export function ReportSettingsModal({
  reportType,
  reportLength,
  onSelectType,
  onSelectLength,
  onReset,
  onClose,
  onConfirm,
  canSubmit,
}: Props) {
  const isAcademicSurvey = reportType === 'Academic Survey';

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(17,24,39,0.18)] backdrop-blur-[2px] flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[900px] rounded-[28px] bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.18)] border border-white/70"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-[20px] font-bold text-[#111827]">Report Settings</h3>
            <p className="text-[14px] text-gray-500 mt-1">Type Settings and output scope</p>
          </div>
          <button onClick={onReset} className="text-[13px] text-gray-400 hover:text-gray-600 underline">
            Reset
          </button>
        </div>

        <div className="space-y-6">
          {/* Step 1: Type */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-[#f3e8ff] text-[#7e22ce] text-[13px] font-bold flex items-center justify-center">1</span>
              <span className="text-[15px] font-semibold text-gray-700">Type Settings</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {REPORT_TYPE_OPTIONS.map((option) => {
                const isSelected = reportType === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => onSelectType(option.value)}
                    className={`relative w-full text-left rounded-2xl border p-4 transition-all h-full flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#8b5cf6] bg-white shadow-[0_0_0_1px_#8b5cf6]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full mb-2">
                      <div className="flex items-center gap-2 flex-wrap pr-2">
                        <div className="text-[15px] font-bold text-gray-900">{option.label}</div>
                        {option.value === 'Research Report' && (
                          <span className="inline-flex items-center rounded-md bg-[#f3e8ff] px-2 py-0.5 text-[10px] font-bold text-[#7e22ce] whitespace-nowrap">
                            ~15 min
                          </span>
                        )}
                      </div>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white flex-shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0" />
                      )}
                    </div>
                    <div className="text-[13px] leading-relaxed text-gray-500">{option.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Survey Depth */}
          {isAcademicSurvey && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#f3e8ff] text-[#7e22ce] text-[13px] font-bold flex items-center justify-center">2</span>
                <span className="text-[15px] font-semibold text-gray-700">Choose survey depth</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {REPORT_LENGTH_OPTIONS.map((option) => {
                  const isSelected = reportLength === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => onSelectLength(option.value)}
                      className={`relative w-full text-left rounded-2xl border p-4 transition-all h-full flex flex-col ${
                        isSelected
                          ? 'border-[#8b5cf6] bg-white shadow-[0_0_0_1px_#8b5cf6]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full mb-2">
                        <div className="text-[15px] font-bold text-gray-900">{option.label}</div>
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-gray-300" />
                        )}
                      </div>
                      <div className="mb-2">
                        <span className="inline-flex rounded-md bg-[#f3e8ff] px-2 py-0.5 text-[11px] font-semibold text-[#7e22ce]">
                          {option.detail}
                        </span>
                      </div>
                      <div className="text-[13px] leading-relaxed text-gray-500">{option.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 rounded-full text-[15px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!canSubmit}
            className={`px-8 py-3 rounded-full text-[15px] font-semibold transition-all shadow-sm ${
              canSubmit
                ? 'bg-[#8b5cf6] text-white hover:bg-[#7c3aed] shadow-[0_4px_14px_rgba(139,92,246,0.3)]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
