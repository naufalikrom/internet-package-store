import axios from 'axios';
import { useState, useCallback } from 'react';
import { Package, Transaction } from '../types';

const API_URL = 'http://localhost:3000'; // Ensure this points to json-server

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPackages = useCallback(async (): Promise<Package[]> => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/packages`);
            return response.data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch packages';
            setError(errorMessage);
            return [];
        } finally {
            setLoading(false);
        }
    }, []); // Empty deps since API_URL is constant

    const fetchTransactions = useCallback(async (customerId: number): Promise<Transaction[]> => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/transactions`, {
                params: { customerId }
            });
            return response.data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch transactions';
            setError(errorMessage);
            return [];
        } finally {
            setLoading(false);
        }
    }, []); // Empty deps since API_URL is constant

    const purchasePackage = useCallback(async (customerId: number, packageId: number): Promise<Transaction> => {
        setLoading(true);
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
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []); // Empty deps since API_URL is constant

    return { fetchPackages, fetchTransactions, purchasePackage, loading, error };
};

