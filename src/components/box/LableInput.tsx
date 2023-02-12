import React from 'react';

interface InputProps {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    rows?: number;
}

const LabelInput: React.FC<InputProps> = ({ label, name, value, onChange, type, rows }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
                {label}
            </label>
            <input
                type={type || 'text'}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-400 p-2 rounded-lg"
            />
        </div>
    );
};

export default LabelInput;