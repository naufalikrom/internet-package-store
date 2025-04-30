import { Card as ShadcnCard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ title, children, className }: CardProps) => {
    return (
        <ShadcnCard className={className}>
            {title && (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            )}
            <CardContent>{children}</CardContent>
        </ShadcnCard>
    );
};