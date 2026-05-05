import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

export default function DeadlineCountdown() {
    const targetDate = new Date("2026-07-30T23:59:59").getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Initial call
        updateCountdown();

        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
    };

    const formatTime = (time: number) => {
        return time < 10 ? `0${time}` : time;
    }

    return (
        <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-secondary/10">
            <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-6 flex items-center gap-2 font-inter">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
                Đếm ngược hạn nộp hồ sơ
            </h3>
            <div className="bg-secondary/5 rounded-2xl p-4 md:p-6 border border-secondary/20 text-center mx-auto overflow-hidden">
                <div className="flex justify-center items-center gap-1 lg:gap-2 mb-2 w-full">
                    <div className="flex flex-col items-center flex-1">
                        <p className="text-2xl md:text-3xl xl:text-4xl font-black text-secondary tracking-tighter font-headline">{timeLeft.days}</p>
                        <p className="text-[9px] xl:text-[10px] uppercase font-bold text-on-surface-variant/70 tracking-widest mt-1">Ngày</p>
                    </div>
                    <div className="text-xl md:text-2xl xl:text-3xl font-black text-secondary/30 pb-3 md:pb-4 shrink-0">:</div>
                    <div className="flex flex-col items-center flex-1">
                        <p className="text-2xl md:text-3xl xl:text-4xl font-black text-secondary tracking-tighter font-headline">{formatTime(timeLeft.hours)}</p>
                        <p className="text-[9px] xl:text-[10px] uppercase font-bold text-on-surface-variant/70 tracking-widest mt-1">Giờ</p>
                    </div>
                    <div className="text-xl md:text-2xl xl:text-3xl font-black text-secondary/30 pb-3 md:pb-4 shrink-0">:</div>
                    <div className="flex flex-col items-center flex-1">
                        <p className="text-2xl md:text-3xl xl:text-4xl font-black text-secondary tracking-tighter font-headline">{formatTime(timeLeft.minutes)}</p>
                        <p className="text-[9px] xl:text-[10px] uppercase font-bold text-on-surface-variant/70 tracking-widest mt-1">Phút</p>
                    </div>
                    <div className="text-xl md:text-2xl xl:text-3xl font-black text-secondary/30 pb-3 md:pb-4 shrink-0">:</div>
                    <div className="flex flex-col items-center flex-1">
                        <p className="text-2xl md:text-3xl xl:text-4xl font-black text-secondary tracking-tighter font-headline">{formatTime(timeLeft.seconds)}</p>
                        <p className="text-[9px] xl:text-[10px] uppercase font-bold text-on-surface-variant/70 tracking-widest mt-1">Giây</p>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-secondary/10">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <p className="text-xs font-bold text-on-surface font-inter">Hạn chót: 30/07/2026</p>
                </div>
            </div>
        </div>
    );
}
