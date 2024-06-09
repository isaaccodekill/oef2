import { FieldError, Path, UseFormRegister } from 'react-hook-form'
import { Prisma } from '@prisma/client';

export interface CreateAccountForm extends Record<string, any> {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
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
    onChange: (val: any) => void
}

export interface SelectProps {
    placeholder: string;
    name: string;
    label: string;
    options: { value: string, label: string, disabled: boolean }[];
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

export interface SelectOptions {
    value: string;
    label: string;
    disabled: boolean;
}

export interface CreateTreeForm {
    name: string;
    species: string;
    yearPlanted: string;
    height: number;
    trunkCircumference: number;
}

export interface EditTreeForm {
    id: string;
    name: string;
    species: string;
    yearPlanted: string;
    height: number;
    trunkCircumference: number;
}

export interface DashboardData {
    totalTrees: number;
    userTrees: number;
    commonSpecies: { species: string; count: number }[];
    averageHeight: number;
}

export interface TimeSeriesData {
    year: string;
    trees_planted: number;
}

export interface TreeData extends Prisma.TreeGetPayload<{
    include: {
        address: true;
    }
}> { }