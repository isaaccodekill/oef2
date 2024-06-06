'use client';

import { Text } from "@/components/ui/text";
import { useForm } from 'react-hook-form'
import { SignInForm } from "@/types";
import FormFieldInput from "@/components/ui/form-field-input";
import Button from "@/components/ui/button"
import Link from "next/link";



const CreateAccountPage: React.FC = () => {

    const {
        watch,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
        setError,
    } = useForm<SignInForm>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = (data: SignInForm) => {

    }
    const password = watch('password')
    const email = watch('email')





    return (
        <div className="w-full pt-20 pb-40">
            <Text size="xl" weight='bold' className="text-center">
                Sign in to use tree tracker
            </Text>
            <div className="w-full mt-10 flex justify-center">
                <form className="w-[350px]" onSubmit={e => e.preventDefault()}>
                    <div className="flex flex-col gap-4 py-10">
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
                    </div>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        className="w-full h-[40px]"
                        loading={false}
                        text="Log In"
                    />
                    <div className="flex mt-4 justify-center">
                        <Link href="/auth/create-account">
                            <span className="text-[#20A2FE] hover:underline"> Create a new account </span>
                        </Link>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default CreateAccountPage;