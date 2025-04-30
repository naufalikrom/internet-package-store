import { Card } from '../molecules/Card';
import { Package, Transaction } from '../../types';
import { format, parseISO } from 'date-fns';

interface TransactionListProps {
    transactions: Transaction[];
    packages: Package[];
}

export const TransactionList = ({ transactions, packages }: TransactionListProps) => (
    <Card title="Transaction History">
        {transactions.length === 0 ? (
            <p>No transactions yet.</p>
        ) : (
            <div className="space-y-4">
                {transactions.map((t) => {
                    const pkg = packages.find((p) => p.id === t.packageId);
                    return (
                        <div key={t.id} className="border-b pb-2">
                            <p>
                                <strong>Package:</strong> {pkg?.name}
                            </p>
                            <p>
                                <strong>Amount:</strong> Rp {t.amount.toLocaleString()}
                            </p>
                            <p>
                                <strong>Date:</strong> {format(parseISO(t.date), 'dd MMM yyyy')}
                            </p>
                        </div>
                    );
                })}
            </div>
        )}
    </Card>
);