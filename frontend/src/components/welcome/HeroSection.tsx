import { Link } from "react-router-dom";
import { Search, LogIn, BookOpen } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative min-h-[870px] flex items-center overflow-hidden bg-surface">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent z-10" />
                <img
                    alt="NEU Library"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuASQKIZdjYyDPwK_eSjmQ6sBWZrY2tAUjXanHgxmH_iuMnUODB82CQUWY0Te_90J-VpbL8rNBDndNrKzcyaNYqvgAxngaqJtCxfAlDxWBMK02MHMvFOCTc_AESPDwawzrnAwGdBwiBrBZ_C4q7F-pkEmYtNgCouF27IVxWW8r9Tglg8izKrYsTEVSY-vZDO7-iN5ma2vax8BA8fzlj1UtKmvKLpqNYqZyvLFT-a8dwqJWl3Spthy1kmiGDOvtN0Z6Ge9QqlJwlf_QE"
                />
            </div>

            <div className="relative z-20 max-w-[1440px] mx-auto px-12 w-full">
                <div className="max-w-3xl">
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold uppercase tracking-wider">
                        <BookOpen className="w-4 h-4" />
                        Thư viện số NEU
                    </div>

                    <h1 className="text-6xl font-extrabold text-primary leading-[1.1] mb-6 tracking-tight">
                        Kho tài liệu Nghiên cứu khoa học của Đại học kinh tế quốc dân
                    </h1>
                    <p className="text-xl text-on-surface-variant leading-relaxed mb-10 max-w-2xl font-light">
                        Cùng kết nối với nguồn tri thức vô tận. Khám phá hàng ngàn công
                        trình nghiên cứu và bài báo khoa học chất lượng cao từ cộng
                        đồng học thuật NEU.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/signup"
                            className="px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-3"
                        >
                            Đăng nhập ngay
                            <LogIn className="w-6 h-6" />
                        </Link>
                        <Link
                            to="/search"
                            className="px-10 py-4 bg-surface-container-lowest text-primary rounded-xl font-bold text-lg shadow-sm hover:bg-surface-container-high transition-colors flex items-center gap-3"
                        >
                            Tìm kiếm ngay
                            <Search className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
