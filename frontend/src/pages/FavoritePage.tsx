import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../components/layout/MainLayout";
import SearchResultList from "../components/search/SearchResultList";
import { Heart, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function FavoritePage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:5001/api/favourite/list", {
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        }
      });

      if (response.data && response.data.data) {
        setResults(response.data.data);
      }
    } catch (error) {
      toast.error("Không thể tải danh sách yêu thích. Vui lòng thử lại sau.");
      console.error("Lỗi fetch favorites", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Header Section */}
        <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shadow-inner">
              <Heart className="w-8 h-8 fill-red-500" />
            </div>
            <div>
              <nav className="flex text-[10px] font-bold uppercase tracking-widest text-outline-variant mb-2 gap-2">
                <Link to="/home" className="hover:text-primary transition-colors flex items-center gap-1">
                  <Home className="w-3 h-3" /> Trang chủ
                </Link>
                <span>/</span>
                <span className="text-primary font-black">Tài liệu yêu thích</span>
              </nav>
              <h1 className="text-3xl font-extrabold text-primary font-headline tracking-tight">Tủ tài liệu yêu thích</h1>
              <p className="text-on-surface-variant text-sm mt-1 font-inter italic">Nơi lưu trữ các đề tài nghiên cứu bạn quan tâm nhất</p>
            </div>
          </div>
          
          <div className="bg-white/50 backdrop-blur px-6 py-3 rounded-2xl border border-white flex items-center gap-3 shadow-sm">
            <span className="text-sm font-bold text-primary">{results.length}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline-variant">Tài liệu đã lưu</span>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-outline-variant/10 min-h-[60vh]">
          {results.length > 0 ? (
            <SearchResultList
              results={results}
              pagination={{ totalPages: 1, total: results.length, page: 1 }}
              onPageChange={() => {}}
              loading={loading}
              searchKeyword="Danh sách yêu thích"
            />
          ) : !loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mb-6 opacity-40">
                <Heart className="w-10 h-10 text-outline-variant" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2 font-headline">Chưa có tài liệu yêu thích</h3>
              <p className="text-on-surface-variant max-w-xs mx-auto text-sm font-inter">
                Bạn chưa lưu đề tài nào vào tủ tài liệu. Hãy quay lại thư viện để tìm những nghiên cứu thú vị nhé!
              </p>
              <Link 
                to="/search" 
                className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                Khám phá thư viện
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center py-40">
               <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
