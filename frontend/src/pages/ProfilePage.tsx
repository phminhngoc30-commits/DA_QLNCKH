import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { User, Mail, GraduationCap, Building2, Calendar, Camera, ShieldCheck, Save, Loader2, Phone, Fingerprint } from 'lucide-react';
import api from '../services/api';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user: authUser, refreshProfile } = useAuth();
    const [loading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [profile, setProfile] = useState<any>({
        HOTEN: '',
        EMAIL: '',
        MASV: '',
        MALOP: '',
        DANTOC: '',
        DOB: '',
        SDT: '',
        GIOITINH: 'Nam'
    });

    useEffect(() => {
        if (authUser) {
            setProfile({
                ...authUser,
                DOB: authUser.DOB ? new Date(authUser.DOB).toISOString().split('T')[0] : ''
            });
        }
    }, [authUser]);

    const handleUpdate = async () => {
        try {
            setUpdating(true);
            await api.put('/users/profile', {
                name: profile.HOTEN,
                email: profile.EMAIL,
                dob: profile.DOB,
                sdt: profile.SDT,
                gioitinh: profile.GIOITINH,
                malop: profile.MALOP,
                dantoc: profile.DANTOC
            });
            await refreshProfile(); // Sync global state (Header, Sidebar, Home)
            toast.success("Cập nhật thông tin thành công!");
        } catch (error: any) {
            console.error("Update profile error", error);
            toast.error(error.response?.data?.message || "Lỗi khi cập nhật thông tin.");
        } finally {
            setUpdating(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile((prev: any) => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="h-[60vh] flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-3xl font-extrabold text-primary font-headline">Cài đặt cá nhân</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Avatar & Quick Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container text-center">
                            <div className="relative inline-block mb-4">
                                <div className="h-32 w-32 rounded-full ring-4 ring-primary/10 bg-primary-container flex items-center justify-center text-white overflow-hidden">
                                    <User className="h-16 w-16" />
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold text-[#00528C] truncate px-2">{profile.HOTEN}</h2>
                            <p className="text-sm text-on-surface-variant font-medium">{profile.MASV} • Sinh viên</p>
                        </div>

                        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container flex items-center gap-4">
                            <div className="p-3 bg-success/10 rounded-xl">
                                <ShieldCheck className="w-6 h-6 text-success" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-on-surface">Tài khoản</h4>
                                <p className="text-xs text-success font-medium">Đã xác thực</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Info */}
                    <div className="md:col-span-2 space-y-6">
                        <section className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-container">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                <h3 className="text-lg font-bold text-[#00528C] font-headline">Thông tin sinh viên</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <EditableField icon={<User className="w-4 h-4" />} label="Họ và tên" name="HOTEN" value={profile.HOTEN} onChange={handleChange} />
                                    <EditableField icon={<Mail className="w-4 h-4" />} label="Email" name="EMAIL" value={profile.EMAIL} onChange={handleChange} />
                                    <EditableField icon={<GraduationCap className="w-4 h-4" />} label="Mã sinh viên" name="MASV" value={profile.MASV} readOnly />
                                    <EditableField icon={<Building2 className="w-4 h-4" />} label="Lớp" name="MALOP" value={profile.MALOP} onChange={handleChange} />
                                    <EditableField icon={<Fingerprint className="w-4 h-4" />} label="Dân tộc" name="DANTOC" value={profile.DANTOC} onChange={handleChange} />
                                    <EditableField icon={<Calendar className="w-4 h-4" />} label="Ngày sinh" name="DOB" type="date" value={profile.DOB} onChange={handleChange} />
                                    <EditableField icon={<Phone className="w-4 h-4" />} label="Số điện thoại" name="SDT" value={profile.SDT} onChange={handleChange} />
                                    
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Giới tính</label>
                                        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-transparent focus-within:border-primary/20 transition-all">
                                            <span className="text-primary opacity-60"><User className="w-4 h-4" /></span>
                                            <select 
                                                name="GIOITINH" 
                                                value={profile.GIOITINH} 
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-0"
                                            >
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                                <option value="Khác">Khác</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-surface-container flex gap-4">
                                    <button 
                                        onClick={handleUpdate}
                                        disabled={updating}
                                        className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:shadow-lg transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2"
                                    >
                                        {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Cập nhật thông tin
                                    </button>
                                    <Link 
                                        to="/change-password"
                                        className="px-6 py-2.5 border border-outline-variant text-on-surface font-bold rounded-xl hover:bg-surface-container transition-all active:scale-95"
                                    >
                                        Đổi mật khẩu
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

const EditableField = ({ icon, label, name, value, onChange, type = "text", readOnly = false }: any) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">{label}</label>
        <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${readOnly ? 'bg-surface-container-lowest border-surface-container' : 'bg-surface-container-low border-transparent focus-within:border-primary/20'}`}>
            <span className="text-primary opacity-60">{icon}</span>
            <input 
                type={type}
                name={name}
                value={value || ''}
                onChange={onChange}
                readOnly={readOnly}
                className={`w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-0 ${readOnly ? 'text-on-surface-variant' : 'text-on-surface'}`}
            />
        </div>
    </div>
);

export default ProfilePage;
