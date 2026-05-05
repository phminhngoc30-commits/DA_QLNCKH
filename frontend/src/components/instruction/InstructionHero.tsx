export default function InstructionHero() {
    return (
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <span className="font-label text-primary uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
                    Trung tâm hỗ trợ nghiên cứu
                </span>
                <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-primary leading-[1.1] mb-6">
                    Hướng dẫn Nghiên cứu Khoa học
                </h1>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl font-light italic font-label">
                    Cung cấp lộ trình chi tiết và quy chuẩn thực hiện đề tài NCKH dành cho sinh viên tại Đại học Kinh tế Quốc dân.
                </p>
            </div>
            <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden shadow-2xl">
                <img
                    alt="Academic desk"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-CZxHgzyNRVHSuxZY-9WOCSzmfOCWPxfGsy15TjsSEZJoWdutcmZkULBqzv24iLW0sGG1VcP8pIILshGygjQcVr9ULq3yvhPLtNi7LkwS72qSkZSInghjqnREujH_4bYaU1Hnr7PJ8os__nwKqYP23cSNtKtYB5b0svAkObicyJ50my7GzPrMfcorOjuirbslWjHp47QfnNidhatfjQPdYqu30iGKufMry6mEjKkPtMQTKwR1uPFxJLgE_Us48akoDNVSH54W5DQ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
        </section>
    );
}
