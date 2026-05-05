import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import { toast } from "sonner";
import { ArrowLeft, Heart, Building2, Calendar, Highlighter, StickyNote, ZoomIn, ZoomOut, FileText } from "lucide-react";

interface ViewDetailSidebarProps {
    project: any;
    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    isHighlighted: boolean;
    setIsHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
    isNotesOpen: boolean;
    setIsNotesOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ViewDetailSidebar({ 
    project, 
    zoom: _zoom, 
    setZoom, 
    isHighlighted, 
    setIsHighlighted,
    isNotesOpen,
    setIsNotesOpen
}: ViewDetailSidebarProps) {
    const navigate = useNavigate();
    const [isFav, setIsFav] = useState(false);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
    const toggleHighlight = () => {
        setIsHighlighted(!isHighlighted);
        toast(isHighlighted ? "Đã tắt chế độ Highlight" : "Đã bật chế độ Highlight", {
            icon: <Highlighter className="w-4 h-4 text-primary" />
        });
    };
    const toggleNotes = () => {
        setIsNotesOpen(!isNotesOpen);
    };

    const toggleFavorite = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("Vui lòng đăng nhập để lưu đề tài");
            return;
        }
        setIsFav(!isFav);
        try {
            if (!isFav) {
                await api.post(`/favourite/${project?.MACONGTRINH}`, {});
                toast.success("Đã lưu vào yêu thích");
            } else {
                await api.delete(`/favourite/${project?.MACONGTRINH}`);
                toast.success("Đã bỏ khỏi danh sách yêu thích");
            }
        } catch (error: any) {
            setIsFav(isFav);
            toast.error(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };

    const formattedDate = project?.TGBATDAU ? new Date(project.TGBATDAU).toLocaleDateString("vi-VN", { month: '2-digit', year: 'numeric' }) : "N/A";

    return (
        <aside className="w-80 bg-surface flex flex-col border-r border-outline-variant/10 shadow-xl shadow-on-surface/5 z-40 overflow-y-auto custom-scrollbar h-full">
            {/* Back & Header Actions */}
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-primary hover:text-primary-container transition-all group"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span className="text-sm font-bold tracking-tight">Quay lại chi tiết</span>
                    </button>
                    <button onClick={toggleFavorite} className="text-secondary hover:scale-110 transition-transform">
                        <Heart className="w-6 h-6" style={isFav ? { fill: "currentColor" } : {}} />
                    </button>
                </div>

                {/* Document Info */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold uppercase tracking-wider">
                            {project?.Caphoso || "Cấp Trường"}
                        </span>
                        <h1 className="text-lg font-extrabold leading-tight tracking-tight text-primary">
                            {project?.TENCONGTRINH || "Chưa có tên công trình"}
                        </h1>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-[11px] font-medium text-outline flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            Lĩnh vực: {project?.TENLINHVUC || "Khác"}
                        </p>
                        <p className="text-[11px] font-medium text-outline flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Công bố: {formattedDate}
                        </p>
                    </div>
                </div>

                {/* Reading Tools Grid */}
                <div className="pt-6 border-t border-outline-variant/20">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4">Công cụ đọc tập tin</p>
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={toggleHighlight}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all group ${isHighlighted ? "bg-primary-container text-white shadow-inner" : "bg-surface-container-low hover:bg-primary-fixed-dim"}`}
                        >
                            <Highlighter className={`w-5 h-5 mb-1 ${isHighlighted ? "text-white" : "text-on-surface-variant group-hover:text-primary"}`} />
                            <span className={`text-[11px] font-semibold ${isHighlighted ? "text-white" : "text-on-surface-variant group-hover:text-primary"}`}>Highlight</span>
                        </button>
                        <button 
                            onClick={toggleNotes}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all group ${isNotesOpen ? "bg-primary-container text-white shadow-inner" : "bg-surface-container-low hover:bg-primary-fixed-dim"}`}
                        >
                            <StickyNote className={`w-5 h-5 mb-1 ${isNotesOpen ? "text-white" : "text-on-surface-variant group-hover:text-primary"}`} />
                            <span className={`text-[11px] font-semibold ${isNotesOpen ? "text-white" : "text-on-surface-variant group-hover:text-primary"}`}>Ghi chú</span>
                        </button>
                        <button 
                            onClick={handleZoomIn}
                            className="flex flex-col items-center justify-center p-3 bg-surface-container-low rounded-xl hover:bg-primary-fixed-dim transition-colors group"
                        >
                            <ZoomIn className="w-5 h-5 text-on-surface-variant group-hover:text-primary mb-1" />
                            <span className="text-[11px] font-semibold text-on-surface-variant group-hover:text-primary">Phóng to</span>
                        </button>
                        <button 
                            onClick={handleZoomOut}
                            className="flex flex-col items-center justify-center p-3 bg-surface-container-low rounded-xl hover:bg-primary-fixed-dim transition-colors group"
                        >
                            <ZoomOut className="w-5 h-5 text-on-surface-variant group-hover:text-primary mb-1" />
                            <span className="text-[11px] font-semibold text-on-surface-variant group-hover:text-primary">Thu nhỏ</span>
                        </button>
                    </div>
                </div>

                {/* Navigation Outline */}
                <div className="pt-6 border-t border-outline-variant/20">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4">Mục lục nhanh</p>
                    <ul className="space-y-3">
                        <li className="text-xs font-semibold text-primary flex items-center gap-2 cursor-pointer hover:underline">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Tóm tắt
                        </li>
                        <li className="text-xs font-medium text-on-surface-variant flex items-center gap-2 cursor-pointer hover:text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span> Thông tin chi tiết
                        </li>
                        <li className="text-xs font-medium text-on-surface-variant flex items-center gap-2 cursor-pointer hover:text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span> Kết quả nghiên cứu
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-auto p-6 bg-surface-container-low/50 border-t border-outline-variant/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-primary">Tài liệu NCKH</p>
                        <p className="text-[10px] text-outline cursor-pointer hover:underline" onClick={() => {
                            const pdfUrl = `http://localhost:5001/api/search/read/${project?.MACONGTRINH}`;
                            window.open(pdfUrl, "_blank");
                        }}>Xem PDF Bản gốc</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
