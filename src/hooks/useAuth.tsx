
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const Navigate = useNavigate();
    const [idUser, setIdUser] = useState<number>(0);
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const data = localStorage.getItem('customer');
        if (data) {
            const parsedData = JSON.parse(data);
            setIdUser(parsedData.id);
            setPhone(parsedData.phone);
            setPassword(parsedData.password);
            setName(parsedData.name);
            setEmail(parsedData.email);
            Navigate("/transactions", { replace: true });
        } else {
            Navigate("/", { replace: true });
        }
    }, []);

    return { idUser, phone, email, password, name };
}