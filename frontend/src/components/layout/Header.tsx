import { Link, useLocation } from "react-router-dom";
import { Search, Bell, UserCircle2, LogOut, Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logoNeu from "../../assets/Logo Neu.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPromptModal from "../common/LoginPromptModal";

interface HeaderProps {
    simple?: boolean;
}

export default function Header({ simple = false }: HeaderProps) {
    const location = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isLoggedIn = !!user;
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [notifications] = useState<any[]>([]); // Mock notifications
    const [modalConfig, setModalConfig] = useState({ title: "Yêu cầu đăng nhập", message: "" });

    const handleProtectedNavigation = (e: React.MouseEvent, path: string, message: string) => {
        if (!isLoggedIn) {
            e.preventDefault();
            setModalConfig({
                title: "Yêu cầu đăng nhập",
                message: message
            });
            setIsLoginModalOpen(true);
        }
    };

    return (
        <header className="bg-[#faf9f9] dark:bg-slate-900/90 backdrop-blur-md text-[#00528C] dark:text-blue-400 font-medium w-full top-0 sticky z-50 border-b border-surface-container">
            <div className="flex justify-between items-center w-full px-8 h-16 max-w-[1440px] mx-auto tracking-tight antialiased">
                <div className="flex items-center gap-6">
                    <Link to="/home" className="flex items-center gap-2">
                        <img
                            alt="NEU Logo"
                            className="w-10 h-10 object-contain rounded-full"
                            src={logoNeu}
                        />
                        <span className="text-xl font-bold text-[#00528C] dark:text-blue-500">
                            NCKH NEU
                        </span>
                    </Link>

                    {!simple && (
                        <nav className="hidden md:flex items-center gap-6 ml-8">
                            <Link
                                className={location.pathname === "/home" ? "text-[#00528C] dark:text-blue-400 border-b-2 border-[#00528C] pb-1 font-bold" : "text-slate-600 dark:text-slate-400 hover:text-[#00528C] transition-colors"}
                                to="/home"
                            >
                                Trang chủ
                            </Link>
                            <Link
                                className={location.pathname === "/submit" ? "text-[#00528C] dark:text-blue-400 border-b-2 border-[#00528C] pb-1 font-bold" : "text-slate-600 dark:text-slate-400 hover:text-[#00528C] transition-colors"}
                                to={isLoggedIn ? "/submit" : "#"}
                                onClick={(e) => handleProtectedNavigation(e, "/submit", "Bạn cần đăng nhập bằng tài khoản sinh viên NEU để có thể nộp hồ sơ NCKH.")}
                            >
                                Nộp hồ sơ
                            </Link>
                            <Link
                                className={location.pathname === "/search" ? "text-[#00528C] dark:text-blue-400 border-b-2 border-[#00528C] pb-1 font-bold" : "text-slate-600 dark:text-slate-400 hover:text-[#00528C] transition-colors"}
                                to="/search"
                            >
                                Thư viện đề tài
                            </Link>
                            <Link
                                className={location.pathname === "/favorites" ? "text-[#00528C] dark:text-blue-400 border-b-2 border-[#00528C] pb-1 font-bold" : "text-slate-600 dark:text-slate-400 hover:text-[#00528C] transition-colors"}
                                to={isLoggedIn ? "/favorites" : "#"}
                                onClick={(e) => handleProtectedNavigation(e, "/favorites", "Bạn cần đăng nhập bằng tài khoản sinh viên NEU để có thể sử dụng tính năng tủ tài liệu yêu thích")}
                            >
                                Tài liệu yêu thích
                            </Link>
                            <Link
                                className={location.pathname === "/instruction" || location.pathname === "/guide" ? "text-[#00528C] dark:text-blue-400 border-b-2 border-[#00528C] pb-1 font-bold" : "text-slate-600 dark:text-slate-400 hover:text-[#00528C] transition-colors"}
                                to="/instruction"
                            >
                                Hướng dẫn
                            </Link>                        </nav>
                    )}
                </div>

                {!simple && (
                    <div className="flex items-center gap-4">
                        <div className="relative hidden lg:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                            <input
                                className="pl-10 pr-4 py-2 bg-surface-container-low rounded-xl text-sm border-none focus:ring-2 focus:ring-primary-container w-64"
                                placeholder="Tìm kiếm tài liệu..."
                                type="text"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const query = (e.target as HTMLInputElement).value;
                                        if (query.trim()) {
                                            navigate(`/search?keyword=${encodeURIComponent(query)}`);
                                        } else {
                                            navigate('/search');
                                        }
                                    }
                                }}
                            />
                        </div>

                        {isLoggedIn ? (
                            <div className="flex items-center gap-3 ml-2 relative">
                                <button 
                                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                    className={`p-2 rounded-sm transition-all duration-200 active:scale-[0.98] relative ${isNotificationsOpen ? "bg-slate-200/80 text-[#00528C]" : "text-slate-600 hover:bg-slate-200/50"}`}
                                >
                                    <Bell className="w-5 h-5" />
                                    {notifications.length > 0 && (
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#faf9f9]" />
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                {isNotificationsOpen && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-10" 
                                            onClick={() => setIsNotificationsOpen(false)}
                                        />
                                        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                                <h4 className="font-bold text-sm text-[#00528C] dark:text-blue-400">Thông báo</h4>
                                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Mới</span>
                                            </div>
                                            <div className="max-h-[400px] overflow-y-auto">
                                                {notifications.length > 0 ? (
                                                    notifications.map((n, i) => (
                                                        <div key={i} className="p-4 border-b border-slate-50 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                                                            <p className="text-sm text-on-surface line-clamp-2">{n.message}</p>
                                                            <p className="text-[10px] text-outline-variant mt-1">{n.time}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-8 text-center">
                                                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                                                            <Bell className="w-6 h-6 text-slate-400" />
                                                        </div>
                                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Không có thông báo</p>
                                                    </div>
                                                )}
                                            </div>
                                            {notifications.length > 0 && (
                                                <div className="p-3 bg-slate-50 dark:bg-slate-700/30 text-center border-t border-slate-100 dark:border-slate-700">
                                                    <button className="text-xs font-bold text-primary hover:underline">Xem tất cả thông báo</button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                                <div className="relative pl-2 border-l border-slate-200 dark:border-slate-700">
                                    <button 
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                    >
                                        <span className="text-sm font-semibold hidden lg:block text-[#00528C] font-inter">
                                            {user.HOTEN}
                                        </span>
                                        <div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center text-white cursor-pointer ring-2 ring-primary/10">
                                            <UserCircle2 className="w-6 h-6" />
                                        </div>
                                    </button>

                                    {/* User Dropdown */}
                                    {isUserDropdownOpen && (
                                        <>
                                            <div 
                                                className="fixed inset-0 z-10" 
                                                onClick={() => setIsUserDropdownOpen(false)}
                                            />
                                            <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div className="p-4 bg-slate-50 dark:bg-slate-700/30 border-b border-slate-100 dark:border-slate-700">
                                                    <p className="text-xs font-bold text-outline-variant uppercase tracking-widest mb-1">Tài khoản</p>
                                                    <p className="text-sm font-bold text-[#00528C] dark:text-blue-400 truncate">{user.HOTEN}</p>
                                                    <p className="text-[10px] text-on-surface-variant truncate">{user.MASV}</p>
                                                </div>
                                                <div className="p-2">
                                                    <Link 
                                                        to="/profile" 
                                                        onClick={() => setIsUserDropdownOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors group"
                                                    >
                                                        <Settings className="w-4 h-4 group-hover:text-primary" />
                                                        Hồ sơ của tôi
                                                    </Link>
                                                    <button 
                                                        onClick={() => {
                                                            setIsUserDropdownOpen(false);
                                                            logout();
                                                            navigate("/welcome");
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:bg-secondary/5 rounded-lg transition-colors group mt-1"
                                                    >
                                                        <LogOut className="w-4 h-4 group-hover:text-secondary" />
                                                        Đăng xuất
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/signup"
                                className="px-6 py-2 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-medium scale-95 active:scale-90 transition-transform block"
                            >
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <LoginPromptModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                title={modalConfig.title}
                message={modalConfig.message}
            />
        </header>
    );
}
