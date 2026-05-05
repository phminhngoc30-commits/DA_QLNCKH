import { useState } from "react";
import { Filter, Book, Search } from "lucide-react";

interface SearchSidebarProps {
    totalItems: number;
    initialFilters: any;
    onApplyFilters: (filters: any) => void;
    onResetFilters: () => void;
}

export default function SearchSidebar({ totalItems, initialFilters, onApplyFilters, onResetFilters }: SearchSidebarProps) {
    const [keyword, setKeyword] = useState(initialFilters.keyword || "");
    const [year, setYear] = useState(initialFilters.year || "");
    const [author, setAuthor] = useState(initialFilters.author || "");
    const [department, setDepartment] = useState(initialFilters.department || "");
    const [field, setField] = useState(initialFilters.field || "");

    const handleApply = () => {
        onApplyFilters({
            keyword,
            year,
            author,
            department,
            field
        });
    };

    const handleReset = () => {
        setKeyword("");
        setYear("");
        setAuthor("");
        setDepartment("");
        setField("");
        onResetFilters();
    };

    return (
        <aside className="col-span-12 lg:col-span-3 space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
                <h2 className="font-headline font-bold text-lg mb-6 flex items-center gap-2 text-primary-container">
                    <Filter className="w-5 h-5" />
                    Bộ lọc tìm kiếm
                </h2>
                <div className="space-y-6">
                    {/* Keyword Filter */}
                    <div>
                        <label className="font-inter text-xs uppercase tracking-widest text-outline mb-3 block">
                            Từ khóa
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                            <input
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                                className="w-full pl-10 bg-surface-container-low border-none rounded-lg text-sm py-3 pr-4 focus:ring-2 focus:ring-primary-container font-inter"
                                placeholder="Nhập tên đề tài..."
                                type="text"
                            />
                        </div>
                    </div>
                    {/* Year Filter */}
                    <div>
                        <label className="font-inter text-xs uppercase tracking-widest text-outline mb-3 block">
                            Năm thực hiện
                        </label>
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                            className="w-full bg-surface-container-low border-none rounded-lg text-sm py-3 px-4 focus:ring-2 focus:ring-primary-container font-inter"
                        >
                            <option value="">Tất cả các năm</option>
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                        </select>
                    </div>
                    {/* Author Filter */}
                    <div>
                        <label className="font-inter text-xs uppercase tracking-widest text-outline mb-3 block">
                            Tác giả
                        </label>
                        <div className="relative">
                            <input
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                                className="w-full bg-surface-container-low border-none rounded-lg text-sm py-3 px-4 focus:ring-2 focus:ring-primary-container font-inter"
                                placeholder="Nhập tên tác giả..."
                                type="text"
                            />
                        </div>
                    </div>
                    {/* Department Filter */}
                    <div>
                        <label className="font-inter text-xs uppercase tracking-widest text-outline mb-3 block">
                            Khoa / Viện
                        </label>
                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                            className="w-full bg-surface-container-low border-none rounded-lg text-sm py-3 px-4 focus:ring-2 focus:ring-primary-container font-inter text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                            <option value="">Tất cả đơn vị</option>
                            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                            <option value="Khoa học dữ liệu và AI">Khoa học dữ liệu và AI</option>
                            <option value="Hệ thống thông tin">Hệ thống thông tin</option>
                            <option value="Khoa học cơ sở">Khoa học cơ sở</option>
                            <option value="Thống kê">Thống kê</option>
                            <option value="Toán kinh tế">Toán kinh tế</option>
                        </select>
                    </div>
                    {/* Field Filter */}
                    <div>
                        <label className="font-inter text-xs uppercase tracking-widest text-outline mb-3 block">
                            Lĩnh vực nghiên cứu
                        </label>
                        <div className="space-y-2">
                            {["Kinh tế học", "Quản trị kinh doanh", "Khoa học dữ liệu", "Luật kinh tế"].map(f => (
                                <label key={f} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="fieldFilter"
                                        checked={field === f}
                                        onChange={() => setField(f)}
                                        className="rounded border-outline-variant text-primary-container focus:ring-primary-container"
                                    />
                                    <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors font-inter">
                                        {f}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleApply}
                        className="w-full bg-primary-container text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-900/20 transition-all flex items-center justify-center gap-2 font-inter"
                    >
                        Tìm kiếm
                    </button>
                    <button
                        onClick={handleReset}
                        className="w-full text-outline-variant text-sm py-1 hover:text-primary transition-colors font-inter flex justify-center items-center"
                    >
                        Thiết lập lại
                    </button>
                </div>
            </div>
            {/* Statistics Card */}
            <div className="bg-primary-container text-white p-6 rounded-xl overflow-hidden relative">
                <div className="relative z-10">
                    <p className="font-inter text-xs uppercase opacity-80 mb-1">
                        Tổng số đề tài
                    </p>
                    <h3 className="text-3xl font-black mb-4 font-headline">{totalItems.toLocaleString()}</h3>
                    <div className="h-1 w-12 bg-white/30 rounded-full mb-4" />
                    <p className="text-sm opacity-90 leading-relaxed font-inter">
                        Kho tri thức số được cập nhật liên tục từ các đơn vị nghiên cứu.
                    </p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10">
                    <Book className="w-32 h-32" />
                </div>
            </div>
        </aside>
    );
}
