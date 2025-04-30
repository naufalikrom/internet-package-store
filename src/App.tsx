import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { Toaster } from './components/atoms/sonner';

function App() {
    return (
        <AuthProvider>
            {/* <MainLayout> */}
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                </Routes>
            {/* </MainLayout> */}
            <Toaster />
        </AuthProvider>
    );
}

export default App;