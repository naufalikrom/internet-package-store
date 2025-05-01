import { Card } from '../atoms/Card';
import { Button } from '../atoms/button';
import { Package } from '../../types';

interface PackageListProps {
    packages: Package[];
    onPurchase: (packageId: number) => void;
}

export const PackageList = ({ packages, onPurchase }: PackageListProps) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-2">Price: Rp {pkg.price.toLocaleString()}</p>
                <p className="text-gray-600 mb-4">Duration: {pkg.duration}</p>
                <Button onClick={() => onPurchase(pkg.id)} className="mt-auto">
                    Purchase
                </Button>
            </Card>
        ))}
    </div>
);