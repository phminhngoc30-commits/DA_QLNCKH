import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useState } from "react";

interface ViewDetailContentProps {
    project: any;
    zoom: number;
    isHighlighted: boolean;
}

export default function ViewDetailContent({ project, zoom, isHighlighted }: ViewDetailContentProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const currentYear = new Date().getFullYear();
    // Helper to highlight matching text
    const highlightText = (text: string) => {
        if (!searchTerm) return text;
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) => 
                    part.toLowerCase() === searchTerm.toLowerCase() 
                        ? <mark key={i} className="bg-orange-300 text-on-surface p-0.5 rounded-sm shadow-sm">{part}</mark> 
                        : part
                )}
            </span>
        );
    };

    const authors = [project?.TenGVHD, project?.TenSinhVien].filter(Boolean).join(", ");

    // Extract mockup strings for content, use project details where possible
    const mockContentText = project?.TOMTAT || `Bài viết tập trung phân tích thực trạng phát triển ${project?.TENLINHVUC || "ngành"} tại Việt Nam trong bối cảnh hiện nay. Đây là tóm tắt thay thế do hệ thống tạo ra dựa trên thông tin đề tài.`;

    return (
        <section className="flex-1 bg-surface-container-low overflow-y-auto p-4 md:p-12 custom-scrollbar relative">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Page 1 */}
                <div 
                    className="bg-surface-container-lowest shadow-2xl shadow-on-surface/5 min-h-[1100px] p-16 relative group transition-all duration-300 origin-top hover:shadow-primary/5"
                    style={{ transform: `scale(${zoom})` }}
                >
                    <div className="absolute top-8 right-8 text-[10px] font-accent italic text-outline-variant">Trang 1 / 1</div>

                    <div className="border-b border-outline-variant/10 pb-8 mb-12 text-center">
                        <p className="font-accent text-sm text-outline mb-2">TRƯỜNG ĐẠI HỌC KINH TẾ QUỐC DÂN</p>
                        <h2 className="text-2xl font-extrabold text-primary tracking-tight uppercase">BÁO CÁO NGHIÊN CỨU KHOA HỌC</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-on-surface leading-tight">
                                {project?.TENCONGTRINH || "Chưa có tên công trình"}
                            </h3>
                            <p className="text-sm font-medium text-on-surface-variant">
                                Tác giả: {authors || "Đang cập nhật"}
                            </p>
                        </div>

                        <div className="space-y-6 pt-10">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-4">Tóm tắt (Abstract)</h4>
                            <p className={`text-sm leading-relaxed text-on-surface-variant text-justify transition-colors duration-300 ${isHighlighted ? "bg-yellow-100/80 px-2 -mx-2 rounded" : ""}`}>
                                {highlightText(mockContentText)}
                            </p>
                            <p className={`text-sm leading-relaxed text-on-surface-variant text-justify transition-colors duration-300 ${isHighlighted ? "bg-yellow-100/80 px-2 -mx-2 rounded" : ""}`}>
                                {highlightText("Từ khóa: Khoa học, Kinh tế, NCKH, NEU.")}
                            </p>
                        </div>

                        <div className="space-y-6 pt-10">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-4">Chi tiết và Đánh giá</h4>
                            <p className="text-sm leading-relaxed text-on-surface-variant text-justify">
                                Đề tài "{project?.TENCONGTRINH}" thuộc lĩnh vực {project?.TENLINHVUC || "Nghiên cứu"}.
                                Báo cáo này được thực hiện nhằm cung cấp cái nhìn tổng quan và phân tích chuyên sâu về các vấn đề liên quan.
                            </p>

                            <div className="grid grid-cols-2 gap-4 my-8">
                                <div className="bg-surface-container-low h-48 rounded-lg flex items-center justify-center border border-outline-variant/10 p-4 text-center">
                                    <span className="text-xs text-outline italic">
                                        Loại hình: {project?.LOAIHINH || "Chưa rõ"}
                                    </span>
                                </div>
                                <div className="bg-surface-container-low h-48 rounded-lg flex items-center justify-center border border-outline-variant/10 p-4 text-center">
                                    <span className="text-xs text-outline italic">
                                        Tình trạng: {project?.TINHTRANG || "Hoàn thành"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 pt-8 border-t border-outline-variant/10 flex justify-between items-center text-[10px] text-outline-variant font-medium">
                        <span>NCKH NEU - © {currentYear}</span>
                        <span>Mã số: {project?.MACONGTRINH || "N/A"}</span>
                    </div>
                </div>
            </div>

            {/* Floating Quick Tools */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary/95 text-on-primary px-6 py-3 rounded-full shadow-2xl backdrop-blur-md z-50">
                <button className="p-1.5 hover:bg-primary-container rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="px-4 border-x border-on-primary/20 flex items-center gap-2">
                    <input className="w-8 h-8 bg-white/10 border-none rounded text-center text-sm font-bold focus:ring-0 text-white" type="text" defaultValue="1" readOnly />
                    <span className="text-xs opacity-70">/ 1</span>
                </div>
                <button className="p-1.5 hover:bg-primary-container rounded-full transition-colors">
                    <ChevronRight className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-on-primary/20 mx-2"></div>
                
                {isSearchOpen ? (
                    <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-300">
                        <input 
                            autoFocus
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/10 border-none rounded-lg px-3 py-1 text-xs text-white placeholder:text-white/40 focus:ring-1 focus:ring-white/30 w-32"
                        />
                        <button onClick={() => { setIsSearchOpen(false); setSearchTerm(""); }} className="p-1 hover:bg-white/10 rounded-full">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsSearchOpen(true)}
                        className="p-1.5 hover:bg-primary-container rounded-full transition-colors"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                )}
            </div>
        </section>
    );
}
