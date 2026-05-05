import React from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

interface ConfirmSubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmSubmitModal: React.FC<ConfirmSubmitModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-surface-container overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-12 w-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                            <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 font-headline">
                        Xác nhận nộp bài?
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        Bạn có chắc chắn muốn nộp bài chính thức không? 
                        <strong className="block mt-2 text-amber-600 dark:text-amber-400">
                            Hồ sơ đã nộp chính thức sẽ không thể sửa đổi thông tin sau khi gửi.
                        </strong>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-6 py-3 bg-[#00528C] hover:bg-[#003d6a] text-white font-bold rounded-xl shadow-lg shadow-[#00528C]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Xác nhận nộp bài
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-[0.98]"
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmSubmitModal;
