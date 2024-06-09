'use client';

import { Text } from "@/components/ui/text";
import { useForm } from 'react-hook-form'
import { SignInForm } from "@/types";
import FormFieldInput from "@/components/ui/form-field-input";
import Button from "@/components/ui/button"
import Link from "next/link";
import { useSignIn } from "@/lib/hooks/useAuth";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";




const SignInPage: React.FC = () => {


    const router = useRouter()
    const userSchema = z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    });

    const {
        watch,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
        setError,
    } = useForm<z.infer<typeof userSchema>>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(userSchema)
    });

    const password = watch('password')
    const email = watch('email')

    const onSuccessfulSignIn = () => {
        // redirect to dashboard
        router.replace('/app/dashboard')
    }

    const { mutate, isPending } = useSignIn(onSuccessfulSignIn)

    const onSubmit = (data: SignInForm) => {
        mutate(data)
    }




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
                        loading={isPending}
                        onClick={handleSubmit(onSubmit)}
                        className="w-full h-[40px]"
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

export default SignInPage;