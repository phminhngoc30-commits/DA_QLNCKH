import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { LogIn, X, AlertCircle } from 'lucide-react';

interface LoginPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ isOpen, onClose, title, message }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLoginRedirect = () => {
        onClose();
        navigate('/signup');
    };

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <AlertCircle className="w-6 h-6 text-primary" />
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-headline">
                        {title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-inter">
                        {message}
                    </p>

                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={handleLoginRedirect}
                            className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-4 h-4" />
                            Đăng nhập ngay
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-full py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all active:scale-[0.98]"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
                
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
                        Hệ thống nghiên cứu khoa học NEU
                    </p>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default LoginPromptModal;
