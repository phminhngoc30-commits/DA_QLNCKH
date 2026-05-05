import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function FeaturedPapers() {
    return (
        <section className="py-24 bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto px-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-extrabold text-primary tracking-tight">
                            Nghiên cứu tiêu biểu
                        </h2>
                        <p className="text-on-surface-variant mt-2">
                            Tuyển tập các công trình có chỉ số ảnh hưởng cao nhất
                        </p>
                    </div>
                    <Link
                        to="/search"
                        className="px-6 py-2 border-2 border-primary/20 text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                        Tất cả bài báo
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Paper Card 1 */}
                    <div className="bg-surface-container-lowest p-8 rounded-xl group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="flex justify-between items-start mb-6">
                            <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-md">
                                KINH TẾ SỐ
                            </span>
                            <Heart className="text-on-surface-variant opacity-20 group-hover:opacity-100 transition-opacity w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-4 leading-tight group-hover:text-primary-container">
                            Tác động của Cách mạng Công nghiệp 4.0 đến tăng trưởng kinh tế
                            tại Việt Nam
                        </h3>
                        <p className="text-sm text-on-surface-variant line-clamp-3 mb-8 font-light">
                            Nghiên cứu phân tích các kênh truyền dẫn của công nghệ số đến năng
                            suất lao động và cơ cấu kinh tế trong giai đoạn 2015-2023...
                        </p>
                        <div className="flex items-center gap-3 pt-6 border-t border-surface-container">
                            <div className="w-10 h-10 rounded-full bg-slate-200" />
                            <div>
                                <div className="text-sm font-bold">PGS.TS. Nguyễn Văn A</div>
                                <div className="text-xs text-on-surface-variant">
                                    Viện Đào tạo SĐH
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Paper Card 2 */}
                    <div className="bg-surface-container-lowest p-8 rounded-xl group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="flex justify-between items-start mb-6">
                            <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-md">
                                MARKETING
                            </span>
                            <Heart className="text-on-surface-variant opacity-20 group-hover:opacity-100 transition-opacity w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-4 leading-tight group-hover:text-primary-container">
                            Hành vi người tiêu dùng Gen Z đối với các sản phẩm thời trang
                            bền vững
                        </h3>
                        <p className="text-sm text-on-surface-variant line-clamp-3 mb-8 font-light">
                            Một khảo sát diện rộng về ý thức môi trường và quyết định mua sắm
                            của thế hệ trẻ tại các thành phố lớn của Việt Nam...
                        </p>
                        <div className="flex items-center gap-3 pt-6 border-t border-surface-container">
                            <div className="w-10 h-10 rounded-full bg-slate-200" />
                            <div>
                                <div className="text-sm font-bold">ThS. Trần Thị B</div>
                                <div className="text-xs text-on-surface-variant">
                                    Khoa Marketing
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Paper Card 3 */}
                    <div className="bg-surface-container-lowest p-8 rounded-xl group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="flex justify-between items-start mb-6">
                            <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-md">
                                TÀI CHÍNH
                            </span>
                            <Heart className="text-on-surface-variant opacity-20 group-hover:opacity-100 transition-opacity w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-4 leading-tight group-hover:text-primary-container">
                            Chính sách tiền tệ và sự ổn định của hệ thống ngân hàng thương mại
                        </h3>
                        <p className="text-sm text-on-surface-variant line-clamp-3 mb-8 font-light">
                            Phân tích thực chứng về mối quan hệ giữa lãi suất điều hành và nợ
                            xấu của các ngân hàng thương mại cổ phần Việt Nam...
                        </p>
                        <div className="flex items-center gap-3 pt-6 border-t border-surface-container">
                            <div className="w-10 h-10 rounded-full bg-slate-200" />
                            <div>
                                <div className="text-sm font-bold">TS. Lê Văn C</div>
                                <div className="text-xs text-on-surface-variant">
                                    Viện Ngân hàng - Tài chính
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
