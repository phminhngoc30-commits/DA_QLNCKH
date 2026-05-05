import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileEdit, LibraryBig, Heart, HelpCircle, Settings, LogOut, UserCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import LogoutModal from "../common/LogoutModal";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const menuItems = [
        { path: "/home", label: "Bảng điều khiển", icon: LayoutDashboard },
        { path: "/submit", label: "Nộp hồ sơ NCKH", icon: FileEdit },
        { path: "/search", label: "Thư viện đề tài", icon: LibraryBig },
        { path: "/favorites", label: "Tủ tài liệu yêu thích", icon: Heart },
        { path: "/instruction", label: "Hướng dẫn NCKH", icon: HelpCircle },
    ];

    const bottomItems = [
        { path: "/profile", label: "Cài đặt", icon: Settings },
    ];

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        logout();
        setIsLogoutModalOpen(false);
        navigate("/welcome");
    };

    return (
        <>
            <aside 
                className={`h-screen fixed left-0 top-0 pt-20 flex flex-col gap-2 p-4 bg-[#faf9f9] border-r border-[#eeeeed] hidden lg:flex font-inter z-40 transition-all duration-300 ease-in-out ${
                    isCollapsed ? "w-20" : "w-64"
                }`}
            >
                {/* Toggle Button */}
                <button 
                    onClick={onToggle}
                    className="absolute -right-3 top-24 bg-white border border-[#eeeeed] rounded-full p-1 shadow-sm hover:bg-surface-container transition-colors z-50"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4 text-[#00528C]" /> : <ChevronLeft className="w-4 h-4 text-[#00528C]" />}
                </button>

                {/* Student Info */}
                <div className={`mb-4 border-b border-surface-variant/30 pb-6 transition-all duration-300 ${isCollapsed ? "px-1" : "p-4"}`}>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-primary-container flex items-center justify-center text-white ring-2 ring-primary/10">
                            <UserCircle2 className="w-7 h-7" />
                        </div>
                        {!isCollapsed && (
                            <div className="overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
                                <h3 className="text-sm font-extrabold text-[#00528C] font-inter leading-tight truncate">
                                    {user?.HOTEN || "Sinh viên"}
                                </h3>
                                <p className="text-[11px] text-on-surface-variant font-medium font-inter mt-0.5">
                                    MSSV: {user?.MASV || ""}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 space-y-1">
                    {menuItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link 
                                key={item.path}
                                to={active ? "#" : item.path} 
                                onClick={(e) => active && e.preventDefault()}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group relative ${
                                    active 
                                        ? "bg-[#00528C] text-white shadow-lg shadow-[#00528C]/20 font-bold" 
                                        : "text-on-surface-variant hover:bg-surface-container-low hover:translate-x-1"
                                }`}
                            >
                                <item.icon className={`w-5 h-5 shrink-0 ${active ? "text-white" : "group-hover:text-[#00528C]"}`} />
                                {!isCollapsed && <span className="text-sm truncate">{item.label}</span>}
                                {active && !isCollapsed && <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="pt-4 border-t border-surface-variant/30 space-y-1 mt-auto">
                    {bottomItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link 
                                key={item.path}
                                to={active ? "#" : item.path} 
                                onClick={(e) => active && e.preventDefault()}
                                className={`flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low hover:translate-x-1 transition-all rounded-lg text-sm ${
                                    active ? "bg-surface-container font-bold" : ""
                                }`}
                            >
                                <item.icon className={`w-5 h-5 shrink-0 ${active ? "text-[#00528C]" : ""}`} />
                                {!isCollapsed && <span className="truncate">{item.label}</span>}
                            </Link>
                        );
                    })}
                    <button 
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-secondary hover:translate-x-1 transition-all text-sm font-bold mt-2 ${isCollapsed ? "justify-center" : ""}`}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span>Đăng xuất</span>}
                    </button>
                </div>
            </aside>

            <LogoutModal 
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={confirmLogout}
            />
        </>
    );
}
