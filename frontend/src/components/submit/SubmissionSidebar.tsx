import React from 'react';
import { Send, Info, Save } from 'lucide-react';

interface SubmissionSidebarProps {
    committed: boolean;
    onToggleCommit: () => void;
    onSubmit: () => void;
    isFormValid: boolean;
}

const SubmissionSidebar: React.FC<SubmissionSidebarProps> = ({ committed, onToggleCommit, onSubmit, isFormValid }) => {
    // Dynamic countdown logic
    const deadline = new Date('2026-07-30T23:59:59');
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return (
        <div className="w-full lg:w-80 space-y-6">
            {/* Commitment & Action */}
            <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4 border border-surface-container">
                <div className="flex gap-3">
                    <input
                        id="commitment-checkbox"
                        checked={committed}
                        onChange={onToggleCommit}
                        className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary/20 border-outline-variant cursor-pointer"
                        type="checkbox"
                    />
                    <label htmlFor="commitment-checkbox" className="text-xs text-on-surface-variant leading-relaxed cursor-pointer select-none">
                        Tôi cam kết các thông tin khai báo trên là chính xác và chịu hoàn toàn trách nhiệm về tính trung thực của hồ sơ này theo quy định của Nhà trường.
                    </label>
                </div>

                <button
                    onClick={onSubmit}
                    disabled={!isFormValid}
                    className={`w-full font-bold py-3.5 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95
                        ${isFormValid
                            ? "bg-gradient-to-r from-primary to-primary-container text-white shadow-primary/20 hover:shadow-xl hover:scale-[1.02]"
                            : "bg-surface-container text-slate-400 cursor-not-allowed shadow-none"}
                    `}
                >
                    <Send className="w-5 h-5" />
                    Nộp bài chính thức
                </button>
            </section>

            {/* Status Card */}
            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-xl">
                <div className="flex gap-3 items-start">
                    <Info className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                        <p className="text-[10px] font-extrabold text-blue-900 uppercase tracking-widest mb-1">Hạn chót nộp bài</p>
                        <p className="text-sm text-blue-800 font-medium leading-tight">
                            {diffDays > 0 ? `Còn lại ${diffDays} ngày` : 'Đã hết hạn'}
                        </p>
                        <p className="text-[11px] text-blue-600/70 mt-1">23:59 - 30/07/2026</p>
                    </div>
                </div>
            </div>

            {/* Helper Tips */}
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/50">
                <p className="text-[10px] font-bold text-orange-800 uppercase mb-2">Lưu ý quan trọng</p>
                <ul className="text-[11px] text-orange-700 space-y-2 leading-relaxed italic">
                    <li>• Hồ sơ đã nộp chính thức sẽ không thể sửa đổi.</li>
                    <li>• Vui lòng kiểm tra kỹ tệp đính kèm trước khi nhấn Nộp bài chính thức.</li>
                </ul>
            </div>
        </div>
    );
};

export default SubmissionSidebar;
