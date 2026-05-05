import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../components/layout/MainLayout";
import SearchSidebar from "../components/search/SearchSidebar";
import SearchResultList from "../components/search/SearchResultList";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0, total: 0, page: 1 });
  const [loading, setLoading] = useState(false);

  // Initial Filters parsed from URL or default
  const filters = {
    keyword: searchParams.get("keyword") || "",
    year: searchParams.get("year") || "",
    author: searchParams.get("author") || "",
    department: searchParams.get("department") || "",
    field: searchParams.get("field") || "",
  };

  const fetchSearchData = async (page = 1, isRandom = false) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get("http://localhost:5001/api/search/search", {
        params: {
          keyword: isRandom ? null : filters.keyword,
          author: isRandom ? null : filters.author,
          year: isRandom ? null : filters.year,
          department: filters.department,
          field: filters.field,
          page,
          limit: isRandom ? 5 : 12, // Show 5 for random top search
          isRandom: isRandom ? true : null
        },
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        }
      });

      if (response.data && response.data.data) {
        setResults(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      toast.error("Không thể tải kết quả tìm kiếm. Vui lòng thử lại sau.");
      console.error("Lỗi fetch search", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const hasFilters = searchParams.toString().length > 0;
    
    // If no explicit search/filters, show random top search
    fetchSearchData(page, !hasFilters);
  }, [searchParams]);

  const handleApplyFilters = (newFilters: any) => {
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, String(value));
      }
    });
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", String(page));
    setSearchParams(newSearchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-12 gap-8 animate-in fade-in duration-700">
        <SearchSidebar
          totalItems={pagination.total || 0}
          initialFilters={filters}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
        <SearchResultList
          results={results}
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
          searchKeyword={
            [
              filters.keyword,
              filters.author ? `Tác giả: ${filters.author}` : "",
              filters.year ? `Năm: ${filters.year}` : "",
              filters.department ? `Đơn vị: ${filters.department}` : "",
              filters.field ? `Lĩnh vực: ${filters.field}` : ""
            ]
              .filter(Boolean)
              .join(" - ") || "Tất cả"
          }
        />
      </div>

      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="bg-[#00528C] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform group">
          <Plus className="w-8 h-8" />
          <span className="absolute right-full mr-4 bg-on-surface text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg font-inter">
            Đăng ký đề tài mới
          </span>
        </button>
      </div>
    </MainLayout>
  );
}
