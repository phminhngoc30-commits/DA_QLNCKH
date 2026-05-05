import { Link } from "react-router-dom";
import { BarChart3, TrendingUp, Medal, BookOpen, Users, Wallet, ArrowRight } from "lucide-react";

export default function StatsHighlights() {
    return (
        <section className="py-24 px-12 max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 h-auto md:h-[600px]">
                {/* Stats Main Card */}
                <div className="md:col-span-2 lg:col-span-2 bg-primary p-10 rounded-full flex flex-col justify-between text-white overflow-hidden relative">
                    <div className="relative z-10">
                        <BarChart3 className="w-10 h-10 mb-4" />
                        <h3 className="text-2xl font-bold">Thống kê lưu trữ</h3>
                        <p className="text-blue-100/70 text-sm mt-2">
                            Dữ liệu cập nhật thời gian thực
                        </p>
                    </div>
                    <div className="space-y-6 relative z-10">
                        <div>
                            <div className="text-5xl font-black">15,000+</div>
                            <div className="text-blue-100 text-sm font-medium">
                                Bài báo khoa học
                            </div>
                        </div>
                        <div>
                            <div className="text-5xl font-black">4,200+</div>
                            <div className="text-blue-100 text-sm font-medium">
                                Đề tài nghiên cứu
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary-container rounded-full blur-3xl opacity-50" />
                </div>

                {/* Featured Categories */}
                <div className="md:col-span-2 lg:col-span-3 bg-surface-container-low p-8 rounded-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-4">
                            Lĩnh vực nổi bật
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-on-surface-variant shadow-sm">
                                Kinh tế học
                            </span>
                            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-on-surface-variant shadow-sm">
                                Quản trị kinh doanh
                            </span>
                            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-on-surface-variant shadow-sm">
                                Tài chính - Ngân hàng
                            </span>
                            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-on-surface-variant shadow-sm">
                                Marketing
                            </span>
                            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-on-surface-variant shadow-sm">
                                Công nghệ thông tin
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <Link to="/search?category=trend" className="bg-white p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer block">
                            <TrendingUp className="text-primary mb-2 w-6 h-6" />
                            <div className="font-bold text-primary">Xu hướng 2024</div>
                            <div className="text-xs text-on-surface-variant">
                                Kinh tế số & AI
                            </div>
                        </Link>
                        <Link to="/search?category=top-cited" className="bg-white p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer block">
                            <Medal className="text-primary mb-2 w-6 h-6" />
                            <div className="font-bold text-primary">Top trích dẫn</div>
                            <div className="text-xs text-on-surface-variant">
                                Phát triển bền vững
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Researcher Card */}
                <div className="md:col-span-4 lg:col-span-1 bg-surface-container-highest rounded-full overflow-hidden relative group">
                    <img
                        alt="Collaboration"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaxN3cy97cY0D_F6HZS7HWHi5O5r0ojKMqr2dYYXNcMB91_rZDokWan04neDQ1nArcc9GGHy46wgDhFvv6xVTHO7vukSjIBkKq5MX5EsZ6A2aEkDiUmVbWBwE72uaXNSHSvLaZTBWnCd1ZID92VMhAXEguppli73MBEHcQbLgZKpb-iGkYvdm47_m5y6bw32_Oc3i4VoMjow0K0dZ7GvYDqJzRB-JJ0xdk0L2gvxDMHRXfNm12QyY7a1cWO61mCoft4MqfMHflByU"
                    />
                    <div className="absolute inset-0 bg-primary/60 flex items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <p className="text-white font-bold">Kết nối nghiên cứu viên</p>
                    </div>
                </div>

                {/* Quick Access */}
                <div className="md:col-span-2 lg:col-span-4 bg-white p-8 rounded-full shadow-sm flex items-center justify-between">
                    <div className="flex gap-12">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary mb-2">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <span className="text-sm font-semibold">Thư viện</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary mb-2">
                                <Users className="w-8 h-8" />
                            </div>
                            <span className="text-sm font-semibold">Hợp tác</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary mb-2">
                                <Wallet className="w-8 h-8" />
                            </div>
                            <span className="text-sm font-semibold">Kinh phí</span>
                        </div>
                    </div>
                    <div className="hidden lg:block text-right">
                        <p className="text-sm text-on-surface-variant italic">
                            "Tri thức là chìa khóa của sự thịnh vượng"
                        </p>
                        <p className="text-xs font-bold text-primary mt-1">
                            — National Economics University
                        </p>
                    </div>
                </div>

                {/* Latest Update Card */}
                <div className="md:col-span-2 lg:col-span-2 bg-tertiary-container text-white p-8 rounded-full flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-widest font-bold opacity-70 mb-2">
                        Cập nhật mới nhất
                    </span>
                    <h4 className="text-lg font-bold leading-tight">
                        Hướng dẫn đăng ký đề tài NCKH cấp Trường năm 2026
                    </h4>
                    <Link to="/instruction" className="mt-4 text-sm font-bold flex items-center gap-2 underline underline-offset-4 decoration-white/30 hover:opacity-80 transition-opacity">
                        Xem chi tiết
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
