import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Lock, ShieldCheck, ArrowLeft, Loader2, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'sonner';

const ChangePasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        otp: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async () => {
        try {
            setSendingOtp(true);
            const response = await api.post('/auth/send-otp');
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Không thể gửi mã xác thực.");
        } finally {
            setSendingOtp(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("Mật khẩu xác nhận không khớp.");
        }

        if (formData.newPassword.length < 6) {
            return toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
        }

        try {
            setLoading(true);
            await api.post('/auth/change-password', {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                otp: formData.otp
            });
            toast.success("Đổi mật khẩu thành công!");
            setTimeout(() => navigate('/profile'), 1500);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Lỗi khi đổi mật khẩu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Link to="/profile" className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-8 hover:underline group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Quay lại hồ sơ
                </Link>

                <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl shadow-xl border border-surface-container">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-[#00528C] font-headline">Đổi mật khẩu</h1>
                            <p className="text-sm text-on-surface-variant font-medium mt-1">
                                Bảo vệ tài khoản của bạn bằng mật khẩu mạnh
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">
                                Mật khẩu hiện tại
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">
                                    Mật khẩu mới
                                </label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">
                                    Xác nhận mật khẩu mới
                                </label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">
                                Mã xác thực (OTP)
                            </label>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        required
                                        placeholder="Nhập mã 6 chữ số"
                                        maxLength={6}
                                        className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm text-center font-bold tracking-[0.5em]"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={sendingOtp}
                                    className="px-6 py-3 bg-surface-container-high text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                                >
                                    {sendingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    Gửi mã
                                </button>
                            </div>
                            <p className="text-[10px] text-on-surface-variant italic pl-1">
                                * Mã xác thực sẽ được gửi về email sinh viên của bạn.
                            </p>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                                Xác nhận đổi mật khẩu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default ChangePasswordPage;
