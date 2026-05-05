import { Info, Download, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import LoginPromptModal from "../common/LoginPromptModal";

export default function InstructionSubmitGuide() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStartSubmission = () => {
        if (!user) {
            setIsModalOpen(true);
        } else {
            navigate("/submit");
        }
    };

    return (
        <section className="bg-surface-container-lowest rounded-3xl p-12 lg:p-20 shadow-sm border border-outline-variant/10">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-4">Hướng dẫn thao tác nộp bài trực tuyến</h2>
                    <p className="text-on-surface-variant font-label italic">Quy trình 4 bước đơn giản ngay trên cổng thông tin điện tử NEU Research.</p>
                </div>

                <div className="space-y-12">
                    {/* Step Item 1 */}
                    <div className="flex gap-8 group">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-2xl group-hover:bg-primary group-hover:text-on-primary transition-colors">1</div>
                        <div className="pt-2">
                            <h4 className="text-xl font-bold text-on-background mb-2">Đăng nhập tài khoản</h4>
                            <p className="text-on-surface-variant leading-relaxed mb-4">
                                Sử dụng tài khoản nội bộ do nhà trường cung cấp để truy cập vào hệ thống quản lý nghiên cứu.
                            </p>
                            <div className="bg-surface-container-low rounded-xl p-4 inline-flex items-center gap-3">
                                <Info className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium">Hỗ trợ: CNTT@neu.edu.vn</span>
                            </div>
                        </div>
                    </div>

                    {/* Step Item 2 */}
                    <div className="flex gap-8 group">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-2xl group-hover:bg-primary group-hover:text-on-primary transition-colors">2</div>
                        <div className="pt-2">
                            <h4 className="text-xl font-bold text-on-background mb-2">Chọn mục "Nộp hồ sơ"</h4>
                            <p className="text-on-surface-variant leading-relaxed">
                                Tại thanh điều hướng chính, chọn chức năng nộp hồ sơ. Hệ thống sẽ liệt kê các đợt nộp bài đang mở.
                            </p>
                        </div>
                    </div>

                    {/* Step Item 3 */}
                    <div className="flex gap-8 group">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-2xl group-hover:bg-primary group-hover:text-on-primary transition-colors">3</div>
                        <div className="pt-2 w-full">
                            <h4 className="text-xl font-bold text-on-background mb-2">Điền thông tin và biểu mẫu</h4>
                            <p className="text-on-surface-variant leading-relaxed mb-6">
                                Nhập các thông tin bắt buộc: Tên đề tài, Chủ nhiệm đề tài, Tóm tắt (Abstract) và tải lên tệp tin định dạng PDF theo mẫu quy định.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-surface p-4 rounded-xl border border-outline-variant flex items-center justify-between">
                                    <span className="text-sm font-medium">Báo cáo tổng kết đề tài</span>
                                    <Download className="w-5 h-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
                                </div>
                                <div className="bg-surface p-4 rounded-xl border border-outline-variant flex items-center justify-between">
                                    <span className="text-sm font-medium">Tóm tắt đề tài</span>
                                    <Download className="w-5 h-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
                                </div>
                                <div className="bg-surface p-4 rounded-xl border border-outline-variant flex items-center justify-between">
                                    <span className="text-sm font-medium">Sản phẩm công bố</span>
                                    <Download className="w-5 h-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step Item 4 */}
                    <div className="flex gap-8 group">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-2xl group-hover:bg-primary group-hover:text-on-primary transition-colors">4</div>
                        <div className="pt-2">
                            <h4 className="text-xl font-bold text-on-background mb-2">Xác nhận nộp bài</h4>
                            <p className="text-on-surface-variant leading-relaxed">
                                Kiểm tra lại toàn bộ thông tin và nhấn "Gửi hồ sơ". Hệ thống sẽ gửi email xác nhận ngay lập tức.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <button onClick={handleStartSubmission} className="bg-secondary text-on-secondary px-10 py-4 rounded-lg font-bold text-lg hover:brightness-110 transition-all shadow-lg inline-flex items-center gap-3">
                        Bắt đầu nộp bài ngay
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <LoginPromptModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Bắt đầu nộp hồ sơ"
                message="Bạn cần đăng nhập để nộp hồ sơ nghiên cứu khoa học."
            />
        </section>
    );
}
