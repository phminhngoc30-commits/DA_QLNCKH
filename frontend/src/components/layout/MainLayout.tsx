import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useAuth } from "../../context/AuthContext";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useAuth();
    const isLoggedIn = !!user;

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col">
            <Header isLoggedIn={isLoggedIn} />
            <div className="flex flex-1">
                {isLoggedIn && <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />}
                <main 
                    className={`flex-1 transition-all duration-300 ease-in-out ${
                        isLoggedIn 
                            ? (isCollapsed ? "lg:ml-20" : "lg:ml-64")
                            : "ml-0"
                    } p-6 md:p-8`}
                >
                    <div className="max-w-[1440px] mx-auto">
                        {children}
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}
