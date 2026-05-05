import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    const token = localStorage.getItem('accessToken');

    if (loading || (!user && token)) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-surface">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-sm font-bold text-primary animate-pulse">Đang xác thực thông tin...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        // Redirect to welcome page but save the intended location
        return <Navigate to="/welcome" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
