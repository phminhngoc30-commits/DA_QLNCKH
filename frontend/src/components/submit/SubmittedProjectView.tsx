import React from 'react';
import { CheckCircle2, LayoutGrid, Calendar, Landmark, Quote, FileText, Paperclip, Verified, UserCheck } from 'lucide-react';

interface SubmittedProjectViewProps {
    project: any;
}

const SubmittedProjectView: React.FC<SubmittedProjectViewProps> = ({ project }) => {
    // Helper to format date
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <div className="flex-1 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Success Banner */}
            <div className="bg-primary-container/10 border-l-4 border-primary p-6 rounded-r-xl flex items-start gap-4 shadow-sm animate-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-full p-1.5 flex items-center justify-center mt-0.5 shadow-lg shadow-primary/20">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-primary font-bold text-lg mb-1 font-headline tracking-tight">Hồ sơ đã nộp thành công</h3>
                    <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed font-inter">
                        Hồ sơ của bạn đã được nộp thành công và đang chờ xét duyệt. Bạn không thể chỉnh sửa nội dung sau khi đã nộp. Hệ thống sẽ gửi thông báo qua email khi có kết quả từ Hội đồng.
                    </p>
                </div>
            </div>

            {/* Header Project Info - Bento Layout Style */}
            <div className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-12 lg:col-span-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 mb-6 group transition-all hover:scale-105">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Mã hồ sơ</span>
                        <span className="text-lg font-black tracking-tighter">{project.projectId || 'N/A'}</span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-primary tracking-tight leading-tight mb-8 font-headline">
                        {project.title}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-surface-container-low rounded-lg text-outline-variant group-hover:text-primary transition-colors">
                                <LayoutGrid className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-outline-variant uppercase font-bold tracking-wider font-muli">Lĩnh vực</p>
                                <p className="font-bold text-sm text-on-surface">{project.fieldName || 'Chưa xác định'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-surface-container-low rounded-lg text-outline-variant group-hover:text-primary transition-colors">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-outline-variant uppercase font-bold tracking-wider font-muli">Giảng viên hướng dẫn</p>
                                <p className="font-bold text-sm text-on-surface">{project.mentorName || project.mentor || 'Chưa xác định'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-surface-container-low rounded-lg text-outline-variant group-hover:text-primary transition-colors">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-outline-variant uppercase font-bold tracking-wider font-muli">Thời gian thực hiện</p>
                                <p className="font-bold text-sm text-on-surface">
                                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-surface-container-low rounded-lg text-outline-variant group-hover:text-primary transition-colors">
                                <Landmark className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-outline-variant uppercase font-bold tracking-wider font-muli">Khoa / Viện</p>
                                <p className="font-bold text-sm text-on-surface">{project.department || 'NCKH NEU'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-surface-container-low p-6 rounded-2xl w-full shadow-inner border border-white/50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-bold text-on-surface-variant font-inter">Trạng thái hồ sơ</span>
                            <span className="px-4 py-1 bg-primary text-white text-[10px] font-extrabold rounded-full tracking-widest shadow-lg shadow-primary/20">ĐÃ NỘP</span>
                        </div>
                        <div className="w-full bg-surface-container-highest rounded-full h-2 mb-2">
                            <div className="bg-primary h-2 rounded-full shadow-sm" style={{ width: '100%' }}></div>
                        </div>
                        <p className="text-[10px] text-outline-variant italic text-right font-muli">Đã được lưu trữ an toàn</p>
                    </div>
                </div>
            </div>

            {/* Research Abstract Card */}
            <div className="group">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-outline-variant mb-6 flex items-center gap-2 group-hover:text-primary transition-colors font-muli">
                    <span className="w-8 h-px bg-outline-variant/30 group-hover:bg-primary/30 transition-colors"></span>
                    Tóm tắt nghiên cứu (Abstract)
                </h4>
                <div className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm border border-outline-variant/10 relative overflow-hidden group-hover:shadow-md transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-primary group-hover:opacity-10 transition-opacity">
                        <Quote className="w-24 h-24 rotate-180" />
                    </div>
                    <p className="text-on-surface-variant leading-loose text-justify font-muli italic relative z-10 text-lg">
                        {project.abstract || "Nội dung tóm tắt đề tài đang được cập nhật từ hồ sơ gốc..."}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Members Section */}
                <div className="group">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-outline-variant mb-6 flex items-center gap-2 group-hover:text-primary transition-colors font-muli">
                        <span className="w-8 h-px bg-outline-variant/30 group-hover:bg-primary/30 transition-colors"></span>
                        Thành viên tham gia
                    </h4>
                    <div className="space-y-4">
                        {project.members && project.members.map((member: any, index: number) => (
                            <div key={index} className="flex items-center gap-5 p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:border-primary/20 hover:shadow-sm transition-all group/card">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${member.role?.includes('Nhóm trưởng') || member.role?.includes('Chủ nhiệm') ? 'bg-primary text-white' :
                                        member.role === 'Giảng viên hướng dẫn' ? 'bg-secondary text-white' :
                                            'bg-surface-container-highest text-on-surface-variant'
                                    }`}>
                                    {member.name ? member.name.split(' ').pop()?.substring(0, 2).toUpperCase() : '??'}
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-bold text-on-surface group-hover/card:text-primary transition-colors font-headline">{member.name}</p>
                                    <p className="text-xs text-outline-variant font-muli italic font-medium">
                                        {member.role} {member.studentId ? `- ${member.studentId}` : ''}
                                    </p>
                                </div>
                                {(member.role?.includes('Nhóm trưởng') || member.role?.includes('Chủ nhiệm')) && (
                                    <Verified className="w-5 h-5 text-primary opacity-20 group-hover/card:opacity-100 transition-opacity" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Attached Documents */}
                <div className="group">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-outline-variant mb-6 flex items-center gap-2 group-hover:text-primary transition-colors font-muli">
                        <span className="w-8 h-px bg-outline-variant/30 group-hover:bg-primary/30 transition-colors"></span>
                        Tài liệu đính kèm
                    </h4>
                    <div className="space-y-4">
                        {project.fileName ? (
                            <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-2xl group/file hover:bg-surface-container-high transition-all cursor-pointer border border-transparent hover:border-outline-variant/10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-red-100 rounded-xl text-red-600 shadow-sm group-hover/file:scale-110 transition-transform">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-on-surface group-hover/file:text-primary transition-colors line-clamp-1">{project.fileName}</p>
                                        <p className="text-[10px] text-outline-variant font-bold uppercase tracking-widest mt-1">Hồ sơ chính .PDF</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => window.open(`http://localhost:5001/api/search/read/${project.MACONGTRINH}`, '_blank')}
                                    className="text-primary hover:underline text-[10px] font-extrabold uppercase tracking-[0.2em] px-4 py-2 bg-white rounded-lg shadow-sm"
                                >
                                    Xem
                                </button>
                            </div>
                        ) : (
                            <div className="p-8 text-center bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant/20">
                                <Paperclip className="w-8 h-8 text-outline-variant mx-auto mb-3 opacity-30" />
                                <p className="text-sm text-outline-variant font-muli font-medium">Không có tài liệu đính kèm</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmittedProjectView;
