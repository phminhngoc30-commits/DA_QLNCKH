import { Link } from "react-router-dom";
import logoNeu from "../../assets/Logo Neu.png";

export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 w-full border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center px-12 py-12 w-full max-w-[1440px] mx-auto">
                <div className="mb-8 md:mb-0">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            alt="NEU Logo"
                            className="h-12 w-12 object-contain rounded-full"
                            src={logoNeu}
                        />
                        <span className="font-semibold text-slate-900 dark:text-white">
                            NCKH NEU
                        </span>
                    </div>

                    <p className="text-xs uppercase tracking-widest text-slate-500 max-w-xs leading-loose">
                        © 2024 National Economics University. Institutional Research Archive.
                    </p>
                </div>

                <div className="flex flex-wrap gap-8">
                    <div className="flex flex-col gap-4">
                        <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest">
                            Tài nguyên
                        </h5>
                        <nav className="flex flex-col gap-2 text-xs uppercase tracking-widest">
                            <Link
                                className="text-slate-500 hover:text-slate-800 transition-colors"
                                to="/"
                            >
                                Academic Integrity
                            </Link>
                            <Link
                                className="text-slate-500 hover:text-slate-800 transition-colors"
                                to="/"
                            >
                                Library Access
                            </Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest">
                            Hệ thống
                        </h5>
                        <nav className="flex flex-col gap-2 text-xs uppercase tracking-widest">
                            <Link
                                className="text-slate-500 hover:text-slate-800 transition-colors"
                                to="/"
                            >
                                Contact Support
                            </Link>
                            <Link
                                className="text-slate-500 hover:text-slate-800 transition-colors"
                                to="/"
                            >
                                NEU Portal
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="px-12 py-6 bg-slate-100/50 dark:bg-slate-900/50">
                <div className="max-w-[1440px] mx-auto text-[10px] uppercase tracking-[0.2em] text-slate-400 text-center">
                    Portal được phát triển bởi Trung tâm Công nghệ Thông tin - Đại học
                    Kinh tế Quốc dân
                </div>
            </div>
        </footer>
    );
}
