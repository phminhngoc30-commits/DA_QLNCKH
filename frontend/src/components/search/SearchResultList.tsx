import { LayoutGrid, List, Heart, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import LoginPromptModal from "../common/LoginPromptModal";

interface SearchResultListProps {
    results: any[];
    pagination: any;
    onPageChange: (page: number) => void;
    loading: boolean;
    searchKeyword: string;
}

export default function SearchResultList({ results, pagination, onPageChange, loading, searchKeyword }: SearchResultListProps) {
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Generate array for pagination
    const pages = Array.from({ length: pagination?.totalPages || 0 }, (_, i) => i + 1);

    // Determine the color band
    const getBandClass = (index: number) => {
        const bands = ["bg-secondary", "bg-primary-container", "bg-tertiary-container", "bg-secondary-container", "bg-primary", "bg-on-primary-container", "bg-tertiary"];
        return bands[index % bands.length];
    }

    return (
        <section className="col-span-12 lg:col-span-9">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-[#00528C] tracking-tight font-headline">
                        {(!searchKeyword || searchKeyword === 'Tất cả') ? "Thư viện đề tài" : "Thư viện Đề tài NCKH"}
                    </h1>
                    <p className="text-on-surface-variant mt-1 font-inter">
                        {loading
                            ? 'Đang cập nhật kết quả...'
                            : (!searchKeyword || searchKeyword === 'Tất cả')
                                ? "Khám phá các công trình nghiên cứu nổi bật từ cộng đồng"
                                : results.length === 0
                                    ? "Không tìm thấy nghiên cứu phù hợp."
                                    : `Hiển thị ${pagination?.total || 0} kết quả tìm kiếm cho "${searchKeyword}"`
                        }
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-surface-container-high rounded-lg text-primary-container">
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-surface-container-low rounded-lg text-outline">
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-outline bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant/30 min-h-[400px]">
                    <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary-container" />
                    <p>Đang tải dữ liệu...</p>
                </div>
            ) : results.length === 0 ? (
                <div className="py-20 text-center text-outline bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant/30 min-h-[400px] flex flex-col justify-center items-center">
                    <p className="text-lg font-medium text-on-surface-variant">Không tìm thấy kết quả nào phù hợp.</p>
                </div>
            ) : (
                <>
                    {/* Bookshelf Layout */}
                    <div className="space-y-16">
                        <div className="relative">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 pb-2">
                                {results.map((item, index) => (
                                    <div key={item.MACONGTRINH} className="group relative flex flex-col items-center">
                                        <Link to={`/view-detail/${item.MACONGTRINH}`} className="relative w-44 h-64 bg-white shadow-xl rounded-sm overflow-hidden transition-transform duration-300 group-hover:-translate-y-4 group-hover:shadow-2xl flex flex-col">
                                            <div className={`h-3 ${getBandClass(index)}`} />
                                            <div className="p-4 flex-grow flex flex-col items-center text-center justify-center space-y-4">
                                                <span className="text-[10px] font-bold text-outline tracking-widest uppercase font-inter">
                                                    {item.TGBATDAU ? new Date(item.TGBATDAU).getFullYear() : 'N/A'} • {item.TENLINHVUC || 'Khác'}
                                                </span>
                                                <h3 className="font-headline font-bold text-sm leading-snug text-primary line-clamp-3">
                                                    {item.TENCONGTRINH}
                                                </h3>
                                                <p className="text-[11px] text-on-surface-variant font-inter italic line-clamp-2">
                                                    {item.TenGVHD ? `GVHD: ${item.TenGVHD}` : item.TenSinhVien ? `SV: ${item.TenSinhVien}` : ''}
                                                </p>
                                            </div>
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="relative group/tooltip">
                                                    <button
                                                        className="bg-white/90 p-1.5 rounded-full shadow-md hover:text-secondary transition-colors"
                                                        title="Lưu vào yêu thích"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            if (!user) {
                                                                setIsModalOpen(true);
                                                            } else {
                                                                // TODO: Hook up toggle favorite API
                                                            }
                                                        }}
                                                    >
                                                        <Heart className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="w-full h-4 bg-gradient-to-b from-transparent to-black/5 border-b-4 border-[#e3e2e2] mt-auto absolute bottom-0 translate-y-12" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="mt-20 flex justify-center items-center gap-4">
                            <button
                                onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
                                disabled={pagination.page === 1}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-surface-container disabled:hover:text-inherit"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="flex gap-2">
                                {pages.map(page => (
                                    <button
                                        key={page}
                                        onClick={() => onPageChange(page)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium font-inter transition-all ${pagination.page === page
                                            ? "bg-primary text-white font-bold"
                                            : "bg-surface-container hover:bg-surface-variant text-on-surface-variant"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => onPageChange(Math.min(pagination.totalPages, pagination.page + 1))}
                                disabled={pagination.page === pagination.totalPages}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-surface-container disabled:hover:text-inherit"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </>
            )}

            <LoginPromptModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Yêu cầu đăng nhập"
                message="Bạn cần đăng nhập bằng tài khoản sinh viên NEU để có thể sử dụng tính năng tủ tài liệu yêu thích"
            />
        </section>
    );
}
