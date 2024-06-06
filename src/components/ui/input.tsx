import React from "react";

interface InputProps {
    value: string | number;
    onChange: (val: string) => void;
    type: string;
    placeholder?: string;
    required?: boolean;
    name: string

}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ value, onChange, type, placeholder, required, name }: InputProps, ref) => {
    return <input
        className="focus:border-[#44639F] border bottom-1 w-full inline-flex h-[40px] items-center justify-center rounded-[4px] px-[15px] text-[15px] leading-none outline-none"
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        value={value}
    />
});

export default Input;