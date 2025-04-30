import AuthLayout from '@/components/templates/AuthLayout';
import { LoginForm } from '../components/organisms/LoginForm';

export const LoginPage = () => {
    return (

        <AuthLayout title='Login'>
            <LoginForm />
        </AuthLayout>
    );
};