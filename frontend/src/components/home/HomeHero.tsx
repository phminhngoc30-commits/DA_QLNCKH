import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function HomeHero() {
    const { user } = useAuth();
    
    return (
        <section className="relative rounded-3xl overflow-hidden mb-10 bg-primary min-h-[320px] py-16 flex items-center editorial-shadow">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10"></div>
            <img
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP3tHBRi5oYwk5V2OHMaAYfzA-NwtQoJb9bMj70swRkQFd06B9-Ui3W3aWSctUrMOx-0ZLKOzGNoU_wsk0a5PbFzBXAIbzluiumZJsrJkiMAeUT9Bp6ynRezB99RLofp60zFf_gQALs_dA8SbVVGHnCZ2MPj457nxu5rnj17mhhR4aBtoXCQXSrIklZjRq-Jd8ua4mANyduEno8EveL7xhztaabAWXmQWL236B9VNuO3zK-7OI00wANyHL9n3Vei46WiDOpJOtu-w"
            />
            <div className="relative z-20 px-8 md:px-16 max-w-3xl">
                <span className="inline-block bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 border border-white/20">
                    Tin tức NCKH mới nhất
                </span>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.2] mb-6 font-headline">
                    Chào mừng quay trở lại, <br className="hidden md:block" /><span className="text-primary-fixed-dim">{user?.HOTEN || "Sinh viên"}</span>
                </h1>
                <p className="text-on-primary-container text-lg md:text-xl mb-10 italic font-accent max-w-2xl leading-relaxed">
                    Hệ thống đang mở đợt đăng ký nghiên cứu cấp trường năm học 2026. Hãy bắt đầu hành trình kiến tạo tri thức của bạn ngay hôm nay.
                </p>
                <div className="flex gap-4">
                    <Link to="/submit" className="bg-white text-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-low transition-colors font-inter">
                        Tham gia ngay
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/instruction" className="bg-primary-container/30 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors font-inter">
                        Lịch trình xét duyệt
                    </Link>
                </div>
            </div>
        </section>
    );
}
