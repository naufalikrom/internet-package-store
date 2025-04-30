import { Input } from '../atoms/input';

interface FormInputProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const FormInput = ({ label, type, value, onChange, placeholder }: FormInputProps) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <Input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoFocus={type === 'text'}
        />
    </div>
);