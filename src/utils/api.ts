import axios from 'axios';
import { Customer, Package, Transaction } from '../types';

const API_URL = 'http://localhost:3000';
interface LoginError extends Error {
    code: string;
}

export const api = {
    login: async (phone: string, password: string): Promise<Customer> => {
        try {
            const response = await axios.get(`${API_URL}/customers`, {
                params: { phone, password },
            });
            console.log('API Response:', response.data);
    
            const customers = response.data;
            
            if (!customers || customers.length === 0) {
                const error: LoginError = new Error('Invalid credentials') as LoginError;
                error.code = 'NO_CUSTOMER';
                throw error;
            }
            
            if (customers.length > 1) {
                const error: LoginError = new Error('Multiple accounts found with the same credentials') as LoginError;
                error.code = 'MULTIPLE_CUSTOMERS';
                throw error;
            }
            
            return customers[0];
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error; // Rethrow custom or API errors
            }
            const genericError: LoginError = new Error('Login failed') as LoginError;
            genericError.code = 'UNKNOWN';
            throw genericError;
        }
    },

    getCustomerByPhone: async (phone: string): Promise<Customer> => {
        const response = await axios.get(`${API_URL}/customers`, {
            params: { phone },
        });
        const customers = response.data;
        if (customers.length === 0) {
            throw new Error('Customer not found');
        }
        return customers[0];
    },

    getPackages: async (): Promise<Package[]> => {
        try {
            const response = await axios.get(`${API_URL}/packages`);
            return response.data;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch packages';
            throw new Error(errorMessage);
        }
    },

    getTransactions: async (customerId: number): Promise<Transaction[]> => {
        try {
            const response = await axios.get(`${API_URL}/transactions`, {
                params: { customerId },
            });
            return response.data;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch transactions';
            throw new Error(errorMessage);
        }
    },

    purchasePackage: async (customerId: number, packageId: number): Promise<Transaction> => {
        try {
            const pkgResponse = await axios.get(`${API_URL}/packages/${packageId}`);
            const pkg = pkgResponse.data;
            if (!pkg) {
                throw new Error('Package not found');
            }
            const transaction: Omit<Transaction, 'id'> = {
                customerId,
                packageId,
                date: new Date().toISOString().split('T')[0],
                amount: pkg.price,
            };
            const response = await axios.post(`${API_URL}/transactions`, transaction);
            return response.data;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Purchase failed';
            throw new Error(errorMessage);
        }
    },
};