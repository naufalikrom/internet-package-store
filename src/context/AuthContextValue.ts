import { createContext, useContext } from 'react';
import { Customer } from '../types';

interface AuthContextType {
    customer: Customer | null;
    login: (phone: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};