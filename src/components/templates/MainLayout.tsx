import { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContextValue';
import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/button';
import { Toaster } from 'sonner'; // Import from sonner
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../atoms/popover";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    const { customer, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gradient-to-br from-teal-900 to-blue-900 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl text-amber-50 font-bold">Internet Package Store</h1>
                    {customer && (
                        <div className="flex space-x-4">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className='w-10 h-10 rounded-4xl' />
                                        <AvatarFallback>Acc</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex flex-col w-full'>
                                        <p>
                                            <strong>Name:</strong> {customer.name}
                                        </p>
                                        <p>
                                            <strong>Email:</strong> {customer.email}
                                        </p>
                                        <p>
                                            <strong>Phone:</strong> {customer.phone}
                                        </p>
                                        <div className='flex justify-end w-full'>
                                            <Button onClick={handleLogout} className=" w-1/2 mt-5">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}
                </div>
            </nav>
            <main className="container mx-auto p-6">{children}</main>
            <Toaster richColors /> {/* Add Toaster */}
        </div>
    );
};