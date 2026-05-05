import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import ViewDetailSidebar from "../components/view-detail/ViewDetailSidebar";
import ViewDetailContent from "../components/view-detail/ViewDetailContent";

export default function ViewDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [zoom, setZoom] = useState(1);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isNotesOpen, setIsNotesOpen] = useState(false);
    const [notes, setNotes] = useState<string[]>([]);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(`http://localhost:5001/api/search/viewdetail/${id}`, {
                    headers: { "Authorization": token ? `Bearer ${token}` : "" }
                });

                if (response.data && response.data.data) {
                    setProject(response.data.data);
                }
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu chi tiết", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDetail();
            window.scrollTo(0, 0);
        } else {
            navigate("/search");
        }
    }, [id, navigate]);

    return (
        <MainLayout>
            <div className="flex h-full animate-in fade-in duration-700">
                {loading ? (
                    <div className="w-full flex flex-col items-center justify-center min-h-[400px]">
                        <Loader2 className="w-12 h-12 animate-spin text-primary-container mb-4" />
                        <p className="text-on-surface-variant font-medium">Đang tải thông tin công trình nghiên cứu...</p>
                    </div>
                ) : project ? (
                    <>
                        <ViewDetailSidebar 
                            project={project} 
                            zoom={zoom} 
                            setZoom={setZoom} 
                            isHighlighted={isHighlighted} 
                            setIsHighlighted={setIsHighlighted} 
                            isNotesOpen={isNotesOpen}
                            setIsNotesOpen={setIsNotesOpen}
                        />
                        <ViewDetailContent 
                            project={project} 
                            zoom={zoom} 
                            isHighlighted={isHighlighted} 
                        />

                        {/* Notes Panel Overlay */}
                        {isNotesOpen && (
                            <div className="w-80 bg-white border-l border-outline-variant/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                                <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface">
                                    <h3 className="font-bold text-primary">Ghi chú cá nhân</h3>
                                    <button onClick={() => setIsNotesOpen(false)} className="text-xs font-bold text-outline hover:text-primary">Đóng</button>
                                </div>
                                <div className="p-6 flex-1 overflow-y-auto space-y-4">
                                    <div className="space-y-2">
                                        <textarea 
                                            placeholder="Thêm ghi chú mới..."
                                            className="w-full p-3 bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    const val = (e.target as HTMLTextAreaElement).value;
                                                    if (val.trim()) {
                                                        setNotes([...notes, val.trim()]);
                                                        (e.target as HTMLTextAreaElement).value = '';
                                                    }
                                                }
                                            }}
                                        />
                                        <p className="text-[10px] text-outline-variant italic">Nhấn Enter để lưu ghi chú</p>
                                    </div>
                                    <div className="space-y-3 pt-4">
                                        {notes.length === 0 ? (
                                            <p className="text-sm text-outline-variant text-center py-8">Chưa có ghi chú nào cho tài liệu này.</p>
                                        ) : (
                                            notes.map((note, i) => (
                                                <div key={i} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg shadow-sm">
                                                    <p className="text-sm text-on-surface-variant leading-relaxed">{note}</p>
                                                    <p className="text-[10px] text-outline-variant mt-2">Vừa xong</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="w-full flex flex-col items-center justify-center min-h-[400px]">
                        <p className="text-xl font-bold text-on-surface mb-2">Không tìm thấy thông tin công trình</p>
                        <p className="text-on-surface-variant mb-6">Mã số nghiên cứu này không tồn tại hoặc có lỗi truy xuất.</p>
                        <button onClick={() => navigate("/search")} className="px-6 py-2 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg hover:shadow-lg transition-transform scale-95 active:scale-90 font-medium tracking-tight">
                            Quay lại thư viện đề tài
                        </button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
