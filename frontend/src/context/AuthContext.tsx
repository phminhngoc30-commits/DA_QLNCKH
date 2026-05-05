import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
    MASV: string;
    HOTEN: string;
    EMAIL?: string;
    MALOP?: string;
    SDT?: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/users/profile');
            if (response.data?.profile) {
                setUser(response.data.profile);
                localStorage.setItem('user', JSON.stringify(response.data.profile));
            }
        } catch (error) {
            console.error("Fetch profile failed", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');

        if (token) {
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setLoading(false);
                // Optionally refresh in background
                fetchProfile();
            } else {
                fetchProfile();
            }
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (token: string) => {
        localStorage.setItem('accessToken', token);
        await fetchProfile();
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
    };

    const refreshProfile = async () => {
        await fetchProfile();
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
