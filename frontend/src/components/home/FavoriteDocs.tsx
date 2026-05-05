import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Heart } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function FavoriteDocs() {
    const [docs, setDocs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

    // Static fallback images for a premium look
    const coverImages = [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Kinh tế số
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop", // Tài chính
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop", // Quản trị
    ];

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get("http://localhost:5001/api/favourite/list", {
                    headers: { "Authorization": token ? `Bearer ${token}` : "" }
                });

                if (response.data && response.data.data) {
                    setDocs(response.data.data.slice(0, 3));
                    // Mark these as favorite in the local state
                    const favMap: any = {};
                    response.data.data.forEach((d: any) => favMap[d.MACONGTRINH] = true);
                    setFavorites(favMap);
                }
            } catch (err) {
                console.error("Failed to load favorite docs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, []);

    const toggleFavorite = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("Vui lòng đăng nhập để thực hiện chức năng này");
            return;
        }

        const isFav = favorites[id] || false;

        // Optimistic UI update
        setFavorites(prev => ({ ...prev, [id]: !isFav }));

        try {
            if (!isFav) {
                await axios.post(`http://localhost:5001/api/favourite/${id}`, {}, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                toast.success("Đã thêm vào tủ tài liệu yêu thích");
            } else {
                await axios.delete(`http://localhost:5001/api/favourite/${id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                toast.success("Đã bỏ khỏi danh sách yêu thích");
            }
        } catch (err: any) {
            // Revert state on failure
            setFavorites(prev => ({ ...prev, [id]: isFav }));
            toast.error(err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    };

    // Keep the layout intact with either Real Data or Mock empty state if API fails
    return (
        <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-extrabold text-primary tracking-tight font-headline">Tủ tài liệu yêu thích</h3>
                <Link to="/favorites" className="text-sm font-semibold text-primary-container flex items-center gap-1 hover:underline font-inter">
                    Xem tất cả
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {docs.map((doc, index) => {
                    const isFav = favorites[doc.MACONGTRINH];
                    const bgClassNames = ["bg-primary-container/10", "bg-secondary-container/10", "bg-tertiary-container/10"];
                    const pillClassNames = ["bg-primary/90", "bg-secondary/90", "bg-tertiary/90"];

                    return (
                        <div
                            key={doc.MACONGTRINH}
                            className={`group bg-surface-container-lowest rounded-3xl overflow-hidden border border-surface-variant/10 hover:shadow-xl transition-all duration-300 ${index === 2 ? "md:col-span-2 flex flex-col md:flex-row h-auto md:h-56" : ""}`}
                        >
                            <div className={`${index === 2 ? "md:w-1/3" : ""} relative h-48 md:h-full overflow-hidden`}>
                                <img alt="Cover Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={coverImages[index % coverImages.length]} />

                                {index !== 2 && (
                                    <div
                                        className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm text-secondary cursor-pointer hover:bg-white transition-colors"
                                        onClick={(e) => toggleFavorite(doc.MACONGTRINH, e)}
                                    >
                                        <Heart className={`w-5 h-5 transition-colors ${isFav ? "fill-red-500 text-red-500" : "fill-transparent text-secondary"}`} />
                                    </div>
                                )}

                                <div className={`absolute ${index === 2 ? "top-4 left-4" : "bottom-4 left-4"}`}>
                                    <span className={`${pillClassNames[index % pillClassNames.length]} text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider font-inter`}>
                                        {doc.TENLINHVUC || "Nghiên cứu"}
                                    </span>
                                </div>
                            </div>

                            <div className={`${index === 2 ? "md:w-2/3 p-8 flex flex-col justify-center" : "p-6"}`}>
                                {index === 2 && (
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-xl font-headline font-extrabold leading-tight group-hover:text-primary transition-colors pr-8 line-clamp-2">
                                            {doc.TENCONGTRINH}
                                        </h4>
                                        <div
                                            className="cursor-pointer hover:scale-110 transition-transform"
                                            onClick={(e) => toggleFavorite(doc.MACONGTRINH, e)}
                                        >
                                            <Heart className={`w-6 h-6 transition-colors ${isFav ? "fill-red-500 text-red-500" : "fill-transparent text-secondary"}`} />
                                        </div>
                                    </div>
                                )}

                                {index !== 2 && (
                                    <h4 className="text-lg font-headline font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-3">
                                        {doc.TENCONGTRINH}
                                    </h4>
                                )}

                                {index === 2 && (
                                    <p className="text-sm text-on-surface-variant mb-6 line-clamp-2 italic font-accent">
                                        Đề tài cấp: {doc.CAPDETAI || "N/A"}. Tình trạng: {doc.TINHTRANG || "Đang thực hiện"}...
                                    </p>
                                )}

                                <div className={`flex items-center gap-3 ${index === 2 ? "mt-auto" : ""}`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-primary ${bgClassNames[index % bgClassNames.length]}`}>
                                        {doc.TenGVHD ? "GV" : "SV"}
                                    </div>
                                    <p className="text-xs text-on-surface-variant font-medium font-inter">
                                        {doc.TenGVHD ? `GVHD: ${doc.TenGVHD}` : doc.TenSinhVien ? `SV: ${doc.TenSinhVien}` : "Nhóm nghiên cứu"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Loading State */}
                {loading && (
                    <div className="col-span-2 py-12 text-center text-on-surface-variant flex flex-col items-center justify-center gap-2">
                        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <p className="text-sm font-medium">Đang tải danh mục tài liệu...</p>
                    </div>
                )}

                {/* Empty State with Marketing Message */}
                {!loading && docs.length === 0 && (
                    <div className="col-span-2 py-16 px-8 text-center bg-primary/5 rounded-3xl border border-primary/10 flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <Heart className="w-8 h-8 text-primary/20" />
                        </div>
                        <div className="max-w-md space-y-2">
                            <p className="text-lg font-bold text-primary">Chưa có tài liệu yêu thích</p>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                                Sử dụng ngay Tủ tài liệu yêu thích để lưu trữ các công trình nghiên cứu nổi bật mà bạn quan tâm và dễ dàng truy cập lại bất cứ lúc nào.
                            </p>
                        </div>
                        <Link
                            to="/search"
                            className="text-sm font-bold text-primary hover:underline underline-offset-4"
                        >
                            Khám phá thư viện ngay
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
