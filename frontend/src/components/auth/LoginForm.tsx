import { Link } from "react-router-dom";
import { User, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import api from "../../services/api";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

interface LoginFormProps {
    showNews?: boolean;
}

export default function LoginForm({ showNews = true }: LoginFormProps) {
    const [msv, setMsv] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    // Remove the useEffect navigation that was causing issues
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!msv.trim()) {
            return toast.error("Vui lòng nhập Mã Sinh Viên / Tên đăng nhập");
        }
        if (!password.trim()) {
            return toast.error("Vui lòng nhập mật khẩu");
        }

        setLoading(true);
        try {
            const response = await api.post("/auth/signin", {
                msv,
                password
            });

            if (response.status === 200) {
                if (response.data?.accessToken) {
                    await login(response.data.accessToken);
                    
                    toast.success("Đăng nhập thành công! Đang chuyển hướng...");
                    
                    // HARD REDIRECT: Force the browser to reload at /home
                    // This is much more reliable than SPA navigation for auth state changes
                    setTimeout(() => {
                        window.location.href = "/home";
                    }, 500);
                }
            }
        } catch (error: any) {
            console.error("Login lỗi:", error);
            const msg = error.response?.data?.message || "Lỗi hệ thống. Vui lòng thử lại sau.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden flex-1">
            {/* Abstract Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-primary-fixed blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-surface-container-highest blur-[100px] rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 max-w-6xl w-full bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,59,102,0.08)]">
                {/* Branding/Image Side (Asymmetric Layout) */}
                <div className="hidden lg:flex lg:col-span-5 relative bg-primary overflow-hidden">
                    <img
                        alt="Modern architectural detail of an academic building"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkCeKwPAVjfid0un_z57kakic_dzzMnJHxmJmuv0OYcA5XV2_JaefzknZUYJYuJQvB2xQsaZDB62Z007SmpeKKwShe2NV60Z5Hf5ucdPQj5Y0TMt8XFb6cC4zaLlg84dW6OyZqDzmNiuYQ58eIjKbUabDSRe0wywIBTrizle_jMXZybImzmjbFCOz0pseOHV1ez9lLBchCDzRKltLksyA8lE0lwnumZJRiJ3AONbvKsDUvKPRukREGGqBx0A5ZvefD8KI_0zP0LCE"
                    />
                    <div className="relative z-10 p-12 flex flex-col justify-end h-full text-on-primary">
                        <div className="mb-6">
                            <span className="font-label text-xs uppercase tracking-widest opacity-80 mb-2 block">
                                NCKH NEU
                            </span>
                            <h2 className="text-3xl font-headline font-bold leading-tight">
                                Nơi khởi nguồn những công trình nghiên cứu tầm vóc.
                            </h2>
                        </div>
                        <p className="text-sm font-light leading-relaxed opacity-70 max-w-xs">
                            Hệ thống tích hợp các công cụ quản lý dữ liệu khoa học hiện đại, hỗ trợ
                            giảng viên và sinh viên tối ưu hóa quy trình nghiên cứu.
                        </p>
                    </div>
                </div>

                {/* Login Form Side */}
                <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-10 text-center lg:text-left">
                            {/* Latest Update Banner */}
                            {showNews && (
                                <div className="mb-6 bg-primary/5 border border-primary/10 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-500">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <p className="text-sm font-medium text-slate-700">
                                            <span className="font-bold text-primary mr-1">Cập nhật mới nhất:</span> 
                                            Hướng dẫn đăng ký đề tài NCKH cấp Trường năm 2026
                                        </p>
                                    </div>
                                    <Link 
                                        to="/instruction" 
                                        className="text-sm font-bold text-primary hover:underline underline-offset-4 flex items-center gap-1"
                                    >
                                        Xem chi tiết
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            )}

                            <h3 className="text-4xl font-headline font-bold text-[#00528C] mb-2">
                                Chào mừng trở lại
                            </h3>
                            <p className="text-base text-on-surface-variant/80 font-medium leading-relaxed">
                                Vui lòng đăng nhập để truy cập vào hệ thống quản lý nghiên cứu khoa học
                            </p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-1.5">
                                <label
                                    className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase"
                                    htmlFor="username"
                                >
                                    Tên đăng nhập
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                                    <input
                                        className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                        id="username"
                                        type="text"
                                        value={msv}
                                        onChange={(e) => setMsv(e.target.value)}
                                        placeholder="Nhập mã sinh viên"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label
                                        className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase"
                                        htmlFor="password"
                                    >
                                        Mật khẩu
                                    </label>
                                    <Link
                                        className="text-xs font-medium text-primary hover:underline underline-offset-4 transition-all"
                                        to="/forgot-password"
                                    >
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                                    <input
                                        className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                        id="password"
                                        placeholder="••••••••"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <button
                                    className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-container text-white font-semibold rounded-lg shadow-[0_10px_15px_-3px_rgba(0,59,102,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                                    {!loading && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="relative py-4 flex items-center">
                                <div className="flex-grow border-t border-surface-container-high" />
                                <span className="flex-shrink mx-4 text-xs font-label text-outline uppercase tracking-widest">
                                    Hoặc
                                </span>
                                <div className="flex-grow border-t border-surface-container-high" />
                            </div>
                            <a
                                href="https://login.microsoftonline.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant font-medium rounded-lg hover:bg-surface-container-low transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 23 23">
                                    <path d="M1 1h10v10H1z" fill="#f35325" />
                                    <path d="M12 1h10v10H12z" fill="#81bc06" />
                                    <path d="M1 12h10v10H1z" fill="#05a6f0" />
                                    <path d="M12 12h10v10H12z" fill="#ffba08" />
                                </svg>
                                <span className="text-sm">Đăng nhập bằng Email sinh viên</span>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
