import { useState } from 'react';
import { FormInput } from '../molecules/FormInput';
import { Button } from '../atoms/button';
import { useAuth } from '../../context/AuthContextValue';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const LoginForm = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(phone, password);
            toast.success('Login successful!');
            
            const data = { phone: phone, password: password };
            localStorage.setItem('customer', JSON.stringify(data));

            navigate('/transactions');
        } catch (err: unknown) {
            if (err instanceof Error && 'code' in err) {
                const loginError = err;
                switch (loginError.code) {
                    case 'NO_CUSTOMER':
                        toast.error('No account found. Please check your phone number and password');
                        break;
                    case 'MULTIPLE_CUSTOMERS':
                        toast.error('Please enter your phone number and password');
                        break;
                    default:
                        toast.error(loginError.message || 'Login failed');
                }
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                label="Phone Number"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08123456789"
            />
            <FormInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
            />
            <div className='flex justify-end w-full'>
                <Button type="submit" disabled={loading} className="w-1/3">
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </div>
        </form>
    );
};