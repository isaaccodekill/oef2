'use client';

import { useState } from "react";
import { Text } from "@/components/ui/text";
import { Country, State, City } from 'country-state-city';
import SelectDropdown from "@/components/ui/select";
import { extractIsoCode, transformCityOptions, transformCountryOptions, transformStateOptions } from "@/lib/utils/address";
import { useForm, Controller } from 'react-hook-form'
import { CreateAccountForm } from "@/types";
import FormFieldInput from "@/components/ui/form-field-input";
import Button from "@/components/ui/button"
import Link from "next/link";



const CreateAccountPage: React.FC = () => {

    const {
        watch,
        control,
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
        setError,
    } = useForm<CreateAccountForm>({
        defaultValues: {
            country: '',
            state: "",
            city: '',
            firstName: "",
            lastName: '',
        }
    });

    const onSubmit = (data: CreateAccountForm) => {

    }

    const country = watch('country')
    const state = watch('state')
    const city = watch('city')
    const firstName = watch('firstName')
    const lastName = watch('lastName')
    const password = watch('password')
    const email = watch('email')
    const confirmPassword = watch('confirmPassword')





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
                            <Text className="text-[12px]"> Country </Text>
                            <SelectDropdown
                                name="country"
                                label="Country"
                                placeholder="Select a country"
                                value={country}
                                onChange={(val: string) => {
                                    setValue('country', val)
                                    setValue('state', '')
                                    setValue('city', '')
                                }}
                                options={transformCountryOptions(Country.getAllCountries())}
                            />
                            {errors.country && <span className="text-[10px] text-red-300">{errors.country.message}</span>}
                        </div>
                        <div className="">
                            <Text className="text-[12px]"> State </Text>
                            <SelectDropdown
                                disabled={!country}
                                name="state"
                                label="State"
                                placeholder="Select a state"
                                value={state}
                                onChange={(val: string) => {
                                    setValue('state', val)
                                    setValue('city', '')
                                }}
                                options={transformStateOptions(State.getStatesOfCountry(extractIsoCode(country)))}
                            />
                            {errors.state && <Text className="text-[10px] text-red-300">{errors.state.message}</Text>}
                        </div>
                        <div className="">
                            <Text className="text-[12px]"> Country </Text>
                            <SelectDropdown
                                disabled={!state}
                                name="city"
                                label="City"
                                placeholder="Select a City"
                                value={city}
                                onChange={(val: string) => {
                                    setValue('city', val)
                                }}
                                options={transformCityOptions(City.getCitiesOfState(extractIsoCode(country), extractIsoCode(state)))}
                            />
                            {errors.city && <Text className="text-[10px] text-red-300">{errors.city.message}</Text>}
                        </div>
                    </div>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        className="w-full h-[40px]"
                        loading={false}
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