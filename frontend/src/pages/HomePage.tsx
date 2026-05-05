import MainLayout from "../components/layout/MainLayout";
import HomeHero from "../components/home/HomeHero";
import DeadlineCountdown from "../components/home/DeadlineCountdown";
import QuickLinks from "../components/home/QuickLinks";
import FavoriteDocs from "../components/home/FavoriteDocs";
import { MessageSquare } from "lucide-react";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="flex flex-col h-full animate-in fade-in duration-700">
        <HomeHero />

        <div className="grid grid-cols-12 gap-8 flex-grow">
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <DeadlineCountdown />
            <QuickLinks />
          </div>

          <FavoriteDocs />
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-40 hidden md:block">
        <button className="bg-[#00528C] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group">
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-white text-primary px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ boxShadow: '0 20px 40px -15px rgba(0, 59, 102, 0.08)' }}>
            Hỗ trợ trực tuyến
          </span>
        </button>
      </div>
    </MainLayout>
  );
}
