import { FormFields, CreateAccountForm } from "@/types";

import React from "react";
import Input from "./input";
import { Text } from "./text";

const FormFieldInput = ({
    type,
    label,
    placeholder,
    value,
    name,
    error,
    onChange
}: FormFields) => (
    <>
        <Text className="text-[12px]"> {label} </Text>
        <Input
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
        {error && <span className="text-[10px] text-red-300">{error.message}</span>}
    </>
);
export default FormFieldInput;