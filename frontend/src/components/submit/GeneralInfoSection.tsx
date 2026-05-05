import React from 'react';

interface GeneralInfoProps {
    formData: {
        title: string;
        abstract: string;
        field: string;
        mentor: string;
        startDate: string;
        endDate: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const GeneralInfoSection: React.FC<GeneralInfoProps> = ({ formData, onChange }) => {
    return (
        <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container">
            <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                <h2 className="text-xl font-bold tracking-tight text-primary font-headline">Thông tin chung</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 tracking-wider">Tên bài NCKH</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={onChange}
                        className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 p-3 text-on-surface transition-all"
                        placeholder="Nhập tiêu đề đầy đủ của đề tài..."
                        type="text"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 tracking-wider">Tóm tắt nghiên cứu</label>
                    <textarea
                        name="abstract"
                        value={formData.abstract}
                        onChange={onChange}
                        className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 p-3 text-on-surface transition-all"
                        placeholder="Mô tả tóm tắt nội dung, phương pháp và mục tiêu..."
                        rows={4}
                    ></textarea>
                </div>

                <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 tracking-wider">Lĩnh vực nghiên cứu</label>
                    <select
                        name="field"
                        value={formData.field}
                        onChange={onChange}
                        className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 p-3 text-on-surface appearance-none transition-all"
                    >
                        <option value="">Chọn lĩnh vực...</option>
                        <option value="Kinh tế và kinh doanh">Kinh tế và kinh doanh</option>
                        <option value="Xã hội học">Xã hội học</option>
                        <option value="Pháp luật">Pháp luật</option>
                        <option value="Khoa học chính trị">Khoa học chính trị</option>
                        <option value="Khoa học xã hội khác">Khoa học xã hội khác</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 tracking-wider">Giảng viên hướng dẫn</label>
                        <input
                            name="mentor"
                            value={formData.mentor}
                            onChange={onChange}
                            className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 p-3 text-on-surface transition-all"
                            placeholder="Họ tên giảng viên..."
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 tracking-wider">Mã nhóm</label>
                        <input
                            name="groupCode"
                            value={(formData as any).groupCode}
                            onChange={onChange}
                            className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 p-3 text-on-surface transition-all"
                            placeholder="Nhập mã nhóm.."
                            type="text"
                            required
                        />
                    </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 tracking-wider">Thời gian bắt đầu</label>
                        <input
                            name="startDate"
                            value={formData.startDate}
                            onChange={onChange}
                            className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 p-3 text-on-surface transition-all"
                            type="month"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 tracking-wider"> Thời gian kết thúc</label>
                        <input
                            name="endDate"
                            value={formData.endDate}
                            onChange={onChange}
                            className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 p-3 text-on-surface transition-all"
                            type="month"
                            max={new Date().toISOString().substring(0, 7)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GeneralInfoSection;
