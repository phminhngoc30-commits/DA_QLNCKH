import { ClipboardList, ClipboardCheck, Award, Archive } from "lucide-react";

export default function InstructionProcess() {
    const steps = [
        {
            id: "01",
            title: "Nộp hồ sơ",
            description: "Sinh viên thực hiện nộp hồ sơ trực tuyến qua hệ thống.",
            icon: <ClipboardList className="w-6 h-6" />,
            highlight: false
        },
        {
            id: "02",
            title: "Xét duyệt",
            description: "Hội đồng khoa học đánh giá tính cấp thiết và khả thi của đề tài.",
            icon: <ClipboardCheck className="w-6 h-6" />,
            highlight: false,
            border: true
        },
        {
            id: "03",
            title: "Công bố giải thưởng",
            description: "Thông báo kết quả và vinh danh các công trình đạt giải.",
            icon: <Award className="w-6 h-6" />,
            highlight: true
        },
        {
            id: "04",
            title: "Lưu trữ",
            description: "Lưu trữ công trình vào thư viện điện tử của trường.",
            icon: <Archive className="w-6 h-6" />,
            highlight: false
        }
    ];

    return (
        <section className="mb-24">
            <div className="flex items-end justify-between mb-12">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-headline font-bold text-on-background mb-4">Quy trình NCKH (4 Bước)</h2>
                    <div className="h-1 w-20 bg-primary mb-6"></div>
                    <p className="text-on-surface-variant">Lộ trình chuẩn hóa từ khâu ý tưởng đến khi công trình được lưu trữ và vinh danh.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`p-8 flex flex-col justify-between transition-colors group rounded-xl
              ${step.highlight
                                ? "bg-primary-container text-on-primary-container shadow-xl"
                                : "bg-surface-container-low hover:bg-surface-container-high"}
              ${step.border ? "bg-surface-container-lowest border-2 border-primary-container/10 hover:border-primary-container/30" : ""}
            `}
                    >
                        <div>
                            <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform
                  ${step.highlight ? "bg-on-primary-container text-primary-container" : "bg-primary-container text-on-primary-container"}
                `}
                            >
                                {step.icon}
                            </div>
                            <span className={`font-bold text-4xl block mb-2 ${step.highlight ? "text-on-primary-container/30" : "text-primary/40"}`}>
                                {step.id}
                            </span>
                            <h3 className={`text-xl font-bold mb-4 ${!step.highlight && "text-primary"}`}>
                                {step.title}
                            </h3>
                            <p className={`text-sm leading-relaxed ${step.highlight ? "opacity-90" : "text-on-surface-variant"}`}>
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
