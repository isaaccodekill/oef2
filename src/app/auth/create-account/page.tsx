'use client';

import { useState } from "react";
import { Text } from "@/components/ui/text";
import { useForm, Controller } from 'react-hook-form'
import { CreateAccountForm } from "@/types";
import FormFieldInput from "@/components/ui/form-field-input";
import Button from "@/components/ui/button"
import Link from "next/link";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignOut, useSignUp } from "@/lib/hooks/useAuth";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";



const CreateAccountPage: React.FC = () => {

    const router = useRouter()
    const userSchema = z.object({
        firstName: z.string().min(2, { message: 'First name must be at least 2 characters long' }),
        lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
        confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),  // compare with password,
        street: z.string().min(2, { message: 'Street must be at least 2 characters long' }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

    const {
        watch,
        control,
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
        setError,
    } = useForm<z.infer<typeof userSchema>>({
        defaultValues: {
            street: "",
            firstName: "",
            lastName: '',
            email: '',
            confirmPassword: '',
        },
        resolver: zodResolver(userSchema)
    });


    const redirectToSignIn = () => {
        // redirect to sign in page
        router.replace('/app/dashboard')
    }

    const { mutate, isPending } = useSignUp(redirectToSignIn)

    const onSubmit = (data: z.infer<typeof userSchema>) => {
        mutate(data as CreateAccountForm)
    }

    const firstName = watch('firstName')
    const lastName = watch('lastName')
    const password = watch('password')
    const email = watch('email')
    const confirmPassword = watch('confirmPassword')
    const street = watch('street')





    return (
        <div className="w-full pt-20 pb-40">
            <Text size="xl" weight='bold' className="text-center">
                Create Account to use tree tracker
            </Text>
            <div className="w-full mt-10 flex justify-center">
                <form className="w-[350px]" onSubmit={e => e.preventDefault()}>
                    <div className="flex flex-col gap-4 py-10">
                        <div className="">
                            <FormFieldInput
                                name="firstName"
                                label="First Name"
                                value={firstName}
                                type="text"
                                placeholder="Jane"
                                onChange={(val: string) => setValue('firstName', val)}
                                error={errors.firstName}
                            />
                        </div>

                        <div className="">
                            <FormFieldInput
                                name="lastName"
                                value={lastName}
                                label="Last Name"
                                type="text"
                                placeholder="Doe"
                                error={errors.lastName}
                                onChange={(val: string) => setValue('lastName', val)}
                            />
                        </div>
                        <div className="">
                            <FormFieldInput
                                name="email"
                                value={email}
                                label="Email Address"
                                type="email"
                                placeholder="janedoe@gmail.com"
                                error={errors.email}
                                onChange={(val: string) => setValue('email', val)}
                            />
                        </div>
                        <div className="">
                            <FormFieldInput
                                name="password"
                                value={password}
                                label="Enter your password"
                                type="password"
                                placeholder="Your password"
                                error={errors.password}
                                onChange={(val: string) => setValue('password', val)}
                            />
                        </div>
                        <div className="">
                            <FormFieldInput
                                value={confirmPassword}
                                name="confirmPassword"
                                label="Confirm your password"
                                type="password"
                                placeholder="Confirm your password"
                                error={errors.confirmPassword}
                                onChange={(val: string) => setValue('confirmPassword', val)}
                            />
                        </div>
                    </div>
                    <div className="py-10 border-t-2 flex flex-col gap-4">
                        <Text size="sm">
                            Enter your address Details
                        </Text>
                        <div className="">
                            <FormFieldInput
                                value={street}
                                name="address"
                                label="Enter your address"
                                type="address"
                                placeholder="Where do you live?"
                                error={errors.street}
                                onChange={(val: string) => setValue('street', val)}
                            />
                        </div>
                    </div>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        className="w-full h-[40px]"
                        loading={isPending}
                        text="Create Account"
                    />
                    <div className="flex mt-4 justify-center">
                        <Link href="/auth/sign-in">
                            <span className="text-[#20A2FE] hover:underline"> Sign in to your account </span>
                        </Link>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default CreateAccountPage;