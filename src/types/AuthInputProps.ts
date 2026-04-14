export interface AuthInputProps {
    type: string;
    placeholder: string;
    icon: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}