import MainLayout from "../components/layout/MainLayout";
import InstructionHero from "../components/instruction/InstructionHero";
import InstructionProcess from "../components/instruction/InstructionProcess";
import InstructionSubmitGuide from "../components/instruction/InstructionSubmitGuide";

const InstructionPage = () => {
    return (
        <MainLayout>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <InstructionHero />
                <InstructionProcess />
                <InstructionSubmitGuide />
            </div>
        </MainLayout>
    );
};

export default InstructionPage;
