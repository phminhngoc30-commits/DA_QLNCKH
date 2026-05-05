import { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout';
import GeneralInfoSection from '../components/submit/GeneralInfoSection';
import type { ProjectMember } from "../components/submit/MemberManagement";
import MemberManagement from "../components/submit/MemberManagement";
import FileAttachment from '../components/submit/FileAttachment';
import SubmissionSidebar from '../components/submit/SubmissionSidebar';
import { toast } from 'sonner';
import { submitProject, getSubmissionStatus } from '../services/submissionService';
import SubmittedProjectView from '../components/submit/SubmittedProjectView';
import { Loader2 } from 'lucide-react';
import ConfirmSubmitModal from '../components/submit/ConfirmSubmitModal';
import { useAuth } from '../context/AuthContext';

const SubmitPage = () => {
    const { user } = useAuth();

    // Form State
    const [isLoadingStatus, setIsLoadingStatus] = useState(true);
    const [submittedProject, setSubmittedProject] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        abstract: '',
        field: '',
        mentor: '',
        groupCode: '',
        startDate: '',
        endDate: '',
    });

    const [members, setMembers] = useState<ProjectMember[]>([
        { 
            id: '1', 
            name: user?.HOTEN || '', 
            studentId: user?.MASV || '', 
            class: user?.MALOP || '', 
            department: user?.TENKHOA || '' 
        },
    ]);

    const [files, setFiles] = useState<File[]>([]);
    const [committed, setCommitted] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const checkStatus = useCallback(async () => {
        setIsLoadingStatus(true);
        setError(null);
        try {
            const res = await getSubmissionStatus();
            if (res && res.hasSubmitted) {
                setSubmittedProject(res.project);
            } else {
                setSubmittedProject(null);
            }
        } catch (err: any) {
            console.error("Status check failed", err);
            setError("Không thể tải trạng thái hồ sơ. Vui lòng thử lại.");
        } finally {
            setIsLoadingStatus(false);
        }
    }, []);

    useEffect(() => {
        checkStatus();
    }, [checkStatus]);

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddMember = () => {
        const newMember: ProjectMember = {
            id: Date.now().toString(),
            name: '',
            studentId: '',
            class: '',
            department: ''
        };
        setMembers(prev => [...prev, newMember]);
    };

    const handleUpdateMember = (id: string, field: keyof ProjectMember, value: string) => {
        setMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
    };

    const handleRemoveMember = (id: string) => {
        setMembers(prev => prev.filter(m => m.id !== id));
        toast.success("Đã xóa thành viên.");
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
            toast.success(`Đã chọn ${newFiles.length} tệp.`);
        }
    };

    const handleDeleteFile = (fileName: string) => {
        setFiles(prev => prev.filter(f => f.name !== fileName));
        toast.success("Đã xóa tệp đính kèm.");
    };

    const isFormValid = 
        formData.title.trim() !== '' &&
        formData.field.trim() !== '' &&
        formData.mentor.trim() !== '' &&
        formData.groupCode.trim() !== '' &&
        formData.startDate.trim() !== '' &&
        formData.endDate.trim() !== '' &&
        members.length > 0 &&
        members.every(m => m.name.trim() !== '' && m.studentId.trim() !== '') &&
        files.length > 0 &&
        committed;

    const handleSubmitClick = () => {
        if (!isFormValid) {
            toast.error("Vui lòng hoàn thiện đầy đủ các trường thông tin bắt buộc.");
            return;
        }
        setIsConfirmModalOpen(true);
    };

    const handleConfirmSubmit = async () => {
        setIsConfirmModalOpen(false);
        try {
            const formDataToSubmit = new FormData();
            
            // Append basic fields
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSubmit.append(key, value);
            });

            // Append members as JSON string
            formDataToSubmit.append('members', JSON.stringify(members));

            // Append file (just the first one for now as per current logic)
            if (files.length > 0) {
                formDataToSubmit.append('file', files[0]);
            }

            await toast.promise(
                submitProject(formDataToSubmit),
                {
                    loading: 'Đang gửi hồ sơ...',
                    success: 'Hồ sơ đã được gửi thành công!',
                    error: (err) => `Lỗi: ${err.response?.data?.message || err.message}`,
                }
            );
            
            // Force status check and manual state update for instant feedback
            setIsLoadingStatus(true);
            const res = await getSubmissionStatus();
            if (res && res.hasSubmitted) {
                setSubmittedProject(res.project);
            } else {
                setTimeout(async () => {
                    const retryRes = await getSubmissionStatus();
                    if (retryRes && retryRes.hasSubmitted) {
                        setSubmittedProject(retryRes.project);
                    }
                    setIsLoadingStatus(false);
                }, 1500);
                return;
            }
            setIsLoadingStatus(false);
        } catch (error: any) {
            console.error("Submit error", error);
            // If already submitted, refresh anyway
            if (error.response?.status === 400) {
                await checkStatus();
            }
        }
    };

    return (
        <MainLayout>
            {isLoadingStatus ? (
                <div className="flex flex-col justify-center items-center h-[60vh]">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="mt-4 text-primary font-bold animate-pulse tracking-widest uppercase text-xs">Đang kiểm tra dữ liệu...</p>
                </div>
            ) : error && !submittedProject ? (
                <div className="max-w-md mx-auto mt-20 text-center space-y-6 p-8 bg-surface-container-low rounded-3xl border border-outline-variant/10 shadow-xl">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
                        <span className="material-symbols-outlined text-4xl">error</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-on-surface">Đã có lỗi xảy ra</h2>
                        <p className="text-on-surface-variant text-sm mt-2">{error}</p>
                    </div>
                    <button 
                        onClick={checkStatus}
                        className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Thử lại
                    </button>
                </div>
            ) : submittedProject ? (
                <div className="max-w-4xl mx-auto py-8">
                    <SubmittedProjectView project={submittedProject} />
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Left Column: Form Content */}
                    <div className="flex-1 space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-3xl font-extrabold text-primary font-headline">Nộp hồ sơ NCKH</h1>
                        </div>

                        <GeneralInfoSection
                            formData={formData}
                            onChange={handleInputChange}
                        />

                        <MemberManagement
                            members={members}
                            onAddMember={handleAddMember}
                            onRemoveMember={handleRemoveMember}
                            onUpdateMember={handleUpdateMember}
                        />
                    </div>

                    {/* Right Column: Sidebar & Actions */}
                    <div className="lg:w-80 shrink-0 space-y-8">
                        <FileAttachment
                            files={files.map(f => ({ name: f.name, size: f.size }))}
                            onUpload={handleFileUpload}
                            onDelete={handleDeleteFile}
                        />
                        <SubmissionSidebar
                            committed={committed}
                            onToggleCommit={() => setCommitted(!committed)}
                            onSubmit={handleSubmitClick}
                            isFormValid={isFormValid}
                        />
                    </div>
                </div>
            )}

            <ConfirmSubmitModal 
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmSubmit}
            />
        </MainLayout>
    );
};

export default SubmitPage;
