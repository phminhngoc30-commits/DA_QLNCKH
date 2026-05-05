import React from 'react';
import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="h-12 w-12 rounded-full bg-error/10 flex items-center justify-center">
                            <LogOut className="w-6 h-6 text-error" />
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-surface-container rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-on-surface-variant" />
                        </button>
                    </div>

                    <h3 className="text-xl font-bold text-[#00528C] mb-2 font-inter">Xác nhận đăng xuất</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                        Bạn có chắc chắn muốn đăng xuất không? Phiên làm việc của bạn sẽ kết thúc và bạn sẽ cần đăng nhập lại để tiếp tục.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl border border-outline-variant text-sm font-bold text-on-surface hover:bg-surface-container transition-all"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-6 py-3 rounded-xl bg-error text-white text-sm font-bold hover:bg-error/90 transition-all shadow-lg shadow-error/20"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Backdrop click to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose} />
        </div>
    );
};

export default LogoutModal;
