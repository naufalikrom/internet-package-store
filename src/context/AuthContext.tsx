// import { ReactNode, useCallback, useMemo, useState } from 'react';
// import { Customer } from '../types';
// import { api } from '../utils/api';
// import { AuthContext } from './AuthContextValue';

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//     const [customer, setCustomer] = useState<Customer | null>(null);

//     const login = useCallback(async (phone: string, password: string) => {
//         const customerData = await api.login(phone, password);
//         setCustomer(customerData);
//     }, []);

//     const logout = useCallback(() => {
//         setCustomer(null);
//     }, []);

//     const value = useMemo(
//         () => ({
//             customer,
//             login,
//             logout,
//         }),
//         [customer, login, logout]
//     );

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

import { ReactNode, useCallback, useMemo, useState, useEffect } from 'react';
import { Customer } from '../types';
import { api } from '../utils/api';
import { AuthContext } from './AuthContextValue';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [customer, setCustomer] = useState<Customer | null>(null);

    // Restore customer from localStorage on mount
    useEffect(() => {
        const storedCustomer = localStorage.getItem('customer');
        if (storedCustomer) {
            try {
                setCustomer(JSON.parse(storedCustomer));
            } catch (err) {
                console.error('Failed to parse stored customer:', err);
                localStorage.removeItem('customer'); // Clear invalid data
            }
        }
    }, []); // Empty dependency array: runs once on mount

    const login = useCallback(async (phone: string, password: string) => {
        const customerData = await api.login(phone, password);
        setCustomer(customerData);
        localStorage.setItem('customer', JSON.stringify(customerData));
    }, []);

    const logout = useCallback(() => {
        setCustomer(null);
        localStorage.removeItem('customer');
    }, []);

    const value = useMemo(
        () => ({
            customer,
            login,
            logout,
        }),
        [customer, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};