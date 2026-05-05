
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/welcome/HeroSection";
import StatsHighlights from "../components/welcome/StatsHighlights";
import FeaturedPapers from "../components/welcome/FeaturedPapers";

export default function WelcomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pb-12 bg-surface">
        <HeroSection />
        <StatsHighlights />
        <FeaturedPapers />
      </main>
      <Footer />
    </>
  );
}

