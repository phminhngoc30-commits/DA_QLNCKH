import React from 'react';
import { UserPlus, X } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'sonner';

export interface ProjectMember {
    id: string;
    name: string;
    studentId: string;
    class: string;
    department: string;
}

interface MemberManagementProps {
    members: ProjectMember[];
    onAddMember: () => void;
    onRemoveMember: (id: string) => void;
    onUpdateMember: (id: string, field: keyof ProjectMember, value: string) => void;
}

const classToFaculty: Record<string, string> = {
    "Khoa học dữ liệu": "Khoa học dữ liệu và AI",
    "Trí tuệ nhân tạo": "Khoa học dữ liệu và AI",
    "Công nghệ thông tin": "Công nghệ thông tin",
    "Kỹ thuật phần mềm": "Công nghệ thông tin",
    "An toàn thông tin": "Công nghệ thông tin",
    "Hệ thống thông tin": "Hệ thống thông tin",
    "Hệ thống thông tin quản lý": "Hệ thống thông tin",
    "Khoa học máy tính": "Công nghệ thông tin",
    "Khoa học tính toán": "Toán kinh tế",
    "Định phí bảo hiểm": "Toán kinh tế",
    "Công nghệ Logistics": "Hệ thống thông tin",
    "Thống kê kinh tế": "Thống kê",
    "Phân tích dữ liệu kinh tế": "Thống kê",
    "Thống kê và Trí tuệ kinh doanh": "Thống kê",
    "Toán kinh tế": "Toán kinh tế",
    "Toán ứng dụng": "Toán kinh tế",
    "Kinh tế số": "Toán kinh tế"
};

const MemberManagement: React.FC<MemberManagementProps> = ({ members, onAddMember, onRemoveMember, onUpdateMember }) => {
    const handleClassChange = (id: string, className: string) => {
        onUpdateMember(id, 'class', className);
        const faculty = classToFaculty[className];
        if (faculty) {
            onUpdateMember(id, 'department', faculty);
        }
    };

    return (
        <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    <h2 className="text-xl font-bold tracking-tight text-primary font-headline">Thành viên tham gia</h2>
                </div>
                <button
                    onClick={onAddMember}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary font-semibold rounded-lg transition-all text-sm active:scale-95"
                    type="button"
                >
                    <UserPlus className="w-5 h-5" />
                    Thêm sinh viên
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2 min-w-[600px]">
                    <thead>
                        <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4">
                            <th className="px-4 pb-2">Họ và tên</th>
                            <th className="px-4 pb-2">MSV</th>
                            <th className="px-4 pb-2">Lớp</th>
                            <th className="px-4 pb-2">Khoa</th>
                            <th className="px-4 pb-2 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-on-surface-variant italic text-sm">
                                    Chưa có thành viên nào được thêm.
                                </td>
                            </tr>
                        ) : (
                            members.map((member) => (
                                <tr key={member.id} className="bg-surface-container-low group hover:bg-surface-container transition-colors">
                                    <td className="px-4 py-2 rounded-l-lg min-w-[200px]">
                                        <input 
                                            type="text"
                                            value={member.name}
                                            onChange={(e) => onUpdateMember(member.id, 'name', e.target.value)}
                                            placeholder="Họ tên..."
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium"
                                        />
                                    </td>
                                    <td className="px-4 py-2 min-w-[120px]">
                                        <input 
                                            type="text"
                                            value={member.studentId}
                                            onChange={(e) => onUpdateMember(member.id, 'studentId', e.target.value.replace(/\D/g, ''))}
                                            onBlur={async (e) => {
                                                const msv = e.target.value;
                                                if (msv.length >= 8) {
                                                    try {
                                                        const res = await api.get(`/users/search/${msv}`);
                                                        if (res.data && res.data.student) {
                                                            const { HOTEN, MALOP, TENKHOA } = res.data.student;
                                                            onUpdateMember(member.id, 'name', HOTEN);
                                                            onUpdateMember(member.id, 'class', MALOP);
                                                            onUpdateMember(member.id, 'department', TENKHOA);
                                                            toast.success(`Đã tìm thấy sinh viên: ${HOTEN}`);
                                                        }
                                                    } catch (err) {
                                                        console.error("Search student failed", err);
                                                    }
                                                }
                                            }}
                                            placeholder="MSV..."
                                            maxLength={8}
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm text-on-surface-variant"
                                        />
                                    </td>
                                    <td className="px-4 py-2 min-w-[180px]">
                                        <input 
                                            type="text"
                                            value={member.class}
                                            onChange={(e) => onUpdateMember(member.id, 'class', e.target.value)}
                                            placeholder="Lớp..."
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm text-on-surface-variant font-medium"
                                        />
                                    </td>
                                    <td className="px-4 py-2 min-w-[220px]">
                                        <select 
                                            value={member.department}
                                            onChange={(e) => onUpdateMember(member.id, 'department', e.target.value)}
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm text-on-surface-variant appearance-none cursor-pointer"
                                        >
                                            <option value="">Chọn khoa...</option>
                                            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                                            <option value="Khoa học dữ liệu và AI">Khoa học dữ liệu và AI</option>
                                            <option value="Hệ thống thông tin">Hệ thống thông tin</option>
                                            <option value="Khoa học cơ sở">Khoa học cơ sở</option>
                                            <option value="Thống kê">Thống kê</option>
                                            <option value="Toán kinh tế">Toán kinh tế</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-2 rounded-r-lg text-right">
                                        <button
                                            onClick={() => onRemoveMember(member.id)}
                                            className="text-error opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-error/10 rounded"
                                            title="Xóa thành viên"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MemberManagement;
