import { Link } from "react-router-dom";
import { User, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
    const [msv, setMsv] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [tempPassword, setTempPassword] = useState("");

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!msv.trim()) {
            return toast.error("Vui lòng nhập Mã Sinh Viên");
        }
        if (!email.trim()) {
            return toast.error("Vui lòng nhập địa chỉ email");
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5001/api/auth/forgot-password", {
                msv,
                email
            });

            if (response.status === 200) {
                setSuccess(true);
                setTempPassword(response.data.tempPassword);
                toast.success("Yêu cầu thành công!");
            }
        } catch (error: any) {
            console.error("Forgot password error:", error);
            const msg = error.response?.data?.message || "Lỗi hệ thống. Vui lòng thử lại sau.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden flex-1">
                <div className="max-w-md w-full bg-surface-container-lowest rounded-2xl p-10 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-primary">Kiểm tra Email của bạn</h3>
                        <p className="text-on-surface-variant text-sm">
                            Mật khẩu mới đã được gửi tới địa chỉ email: <br />
                            <span className="font-bold text-on-surface">{email}</span>
                        </p>
                    </div>
                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 space-y-2">
                        <p className="text-xs uppercase tracking-widest text-outline font-bold">Mật khẩu mới (Demo)</p>
                        <p className="text-3xl font-black text-primary tracking-wider">{tempPassword}</p>
                    </div>
                    <p className="text-xs text-on-surface-variant italic">
                        * Vui lòng sử dụng mật khẩu này để đăng nhập và đổi mật khẩu trong phần cài đặt cá nhân.
                    </p>
                    <Link
                        to="/signup"
                        className="w-full py-3 bg-primary text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Quay lại Đăng nhập
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden flex-1">
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-primary-fixed blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-surface-container-highest blur-[100px] rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 max-w-6xl w-full bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,59,102,0.08)]">
                <div className="hidden lg:flex lg:col-span-5 relative bg-primary overflow-hidden">
                    <img
                        alt="Academic background"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkCeKwPAVjfid0un_z57kakic_dzzMnJHxmJmuv0OYcA5XV2_JaefzknZUYJYuJQvB2xQsaZDB62Z007SmpeKKwShe2NV60Z5Hf5ucdPQj5Y0TMt8XFb6cC4zaLlg84dW6OyZqDzmNiuYQ58eIjKbUabDSRe0wywIBTrizle_jMXZybImzmjbFCOz0pseOHV1ez9lLBchCDzRKltLksyA8lE0lwnumZJRiJ3AONbvKsDUvKPRukREGGqBx0A5ZvefD8KI_0zP0LCE"
                    />
                    <div className="relative z-10 p-12 flex flex-col justify-end h-full text-on-primary">
                        <div className="mb-6">
                            <span className="font-label text-xs uppercase tracking-widest opacity-80 mb-2 block">
                                Hỗ trợ tài khoản
                            </span>
                            <h2 className="text-3xl font-headline font-bold leading-tight">
                                Khôi phục quyền truy cập hệ thống.
                            </h2>
                        </div>
                        <p className="text-sm font-light leading-relaxed opacity-70 max-w-xs">
                            Đừng lo lắng, chúng tôi sẽ giúp bạn lấy lại mật khẩu thông qua tài khoản email sinh viên đã đăng ký.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-10 text-center lg:text-left">
                            <Link to="/signup" className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-6 hover:underline">
                                <ArrowLeft className="w-4 h-4" />
                                Quay lại đăng nhập
                            </Link>
                            <h3 className="text-4xl font-headline font-bold text-[#00528C] mb-2">
                                Quên mật khẩu
                            </h3>
                            <p className="text-base text-on-surface-variant/80 font-medium leading-relaxed">
                                Nhập thông tin tài khoản để nhận lại mật khẩu mới qua email
                            </p>
                        </div>
                        <form onSubmit={handleForgotPassword} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">
                                    Mã sinh viên
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                                    <input
                                        className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                        type="text"
                                        value={msv}
                                        onChange={(e) => setMsv(e.target.value)}
                                        placeholder="Nhập mã sinh viên"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">
                                    Địa chỉ Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                                    <input
                                        className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Nhập email sinh viên"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <button
                                    className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-container text-white font-semibold rounded-lg shadow-[0_10px_15px_-3px_rgba(0,59,102,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Đang kiểm tra...' : 'Quên mật khẩu'}
                                    {!loading && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
