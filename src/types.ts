import {  FieldError, Path, UseFormRegister } from 'react-hook-form'

export interface CreateAccountForm extends Record<string, any> {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    country: string;
    password: string;
    confirmPassword: string;
}

export interface SignInForm {
    email: string;
    password: string;
}

export interface FormFields {
    type: string;
    label: string;
    placeholder: string;
    value: string | number
    name: string
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    onChange: (val: string) => void
}

export interface SelectProps{
    placeholder: string;
    name: string;
    label: string;
    options: {value: string, label: string, disabled: boolean}[];
    value?: string;
    disabled?: boolean;
    onChange?: (val: string) => void;
}

export interface SelectItemProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    value: string;  
}

export interface SelectOptions{
    value: string;
    label: string;
    disabled: boolean;
}