import { useState, useEffect, useMemo } from 'react';
import { PackageList } from '../components/organisms/PackageList';
import { TransactionList } from '../components/organisms/TransactionList';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';
import { Navigate } from 'react-router-dom';
import { Package, Transaction } from '../types';
import { toast } from 'sonner';
import { MainLayout } from '@/components/templates/MainLayout';

export const TransactionsPage = () => {
    const customer = useAuth().idUser;
    const { fetchPackages, fetchTransactions, purchasePackage, loading, error } = useApi();
    const [packages, setPackages] = useState<Package[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        if (customer) {
            fetchPackages().then(setPackages);
            fetchTransactions(customer).then(setTransactions);
        }
    }, [customer, fetchPackages, fetchTransactions]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handlePurchase = async (packageId: number) => {
        if (customer) {
            try {
                const transaction = await purchasePackage(customer, packageId);
                setTransactions([...transactions, transaction]);
                toast.success('Purchase successful!');
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Purchase failed';
                toast.error(errorMessage);
            }
        }
    };

    const totalSpent = useMemo(() => {
        return transactions.reduce((sum, t) => sum + t.amount, 0);
    }, [transactions]);

    if (!customer) {
        return <Navigate to="/" />;
    }

    return (
        <MainLayout>

            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Available Packages</h2>
                    {loading ? (
                        <p>Loading packages...</p>
                    ) : (
                        <PackageList packages={packages} onPurchase={handlePurchase} />
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
                    <p className="mb-4">Total Spent: Rp {totalSpent.toLocaleString()}</p>
                    {loading ? (
                        <p>Loading transactions...</p>
                    ) : (
                        <TransactionList transactions={transactions} packages={packages} />
                    )}
                </div>
            </div>
        </MainLayout>
    );
};