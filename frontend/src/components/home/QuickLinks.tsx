import { UploadCloud, ArrowUpRight, Book, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickLinks() {
    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1 font-inter">Lối tắt nhanh</h3>

            <Link to="/submit" className="group block p-5 bg-primary text-white rounded-3xl transition-transform hover:-translate-y-1 duration-300">
                <div className="flex justify-between items-start mb-4">
                    <span className="p-2 bg-white/20 rounded-xl">
                        <UploadCloud className="w-6 h-6" />
                    </span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <h4 className="text-lg font-bold mb-1 font-headline">Nộp bài nghiên cứu</h4>
                <p className="text-sm text-white/70 font-light font-inter">Tải lên hồ sơ và các tài liệu liên quan cho đề tài của bạn.</p>
            </Link>

            <div className="grid grid-cols-2 gap-4">
                <Link to="/guide" className="p-5 bg-surface-container-high rounded-3xl hover:bg-surface-container-highest transition-colors flex flex-col items-start gap-3">
                    <Book className="w-6 h-6 text-primary" />
                    <h4 className="text-sm font-bold font-inter text-on-surface">Xem hướng dẫn</h4>
                </Link>
                <Link to="/search" className="p-5 bg-surface-container-high rounded-3xl hover:bg-surface-container-highest transition-colors flex flex-col items-start gap-3">
                    <Search className="w-6 h-6 text-primary" />
                    <h4 className="text-sm font-bold font-inter text-on-surface">Tìm đề tài</h4>
                </Link>
            </div>
        </div>
    );
}
