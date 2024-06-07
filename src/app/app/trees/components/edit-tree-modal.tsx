import Button from "@/components/ui/button"
import FormFieldInput from "@/components/ui/form-field-input";
import { CreateTreeForm, EditTreeForm } from "@/types";
import { Modal, ModalBody, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure, ModalHeader, Tag } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { tree } from "next/dist/build/templates/app-page";
import { useEffect } from "react";
import { Text } from "@/components/ui/text";

export default function EditTreeModal({ TreeData, id, onClosed, open, }: { open: boolean, TreeData: EditTreeForm | null, id: string | null, onClosed: () => void }) {


    const closeForm = () => {
        onClosed()
    }



    const {
        watch,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
        setError,
    } = useForm<EditTreeForm>({
        defaultValues: {
            name: TreeData?.name,
            species: TreeData?.species,
            yearPlanted: TreeData?.yearPlanted ? new Date(TreeData?.yearPlanted).toISOString() : new Date().toISOString(),
            height: TreeData?.height,
            trunkCircumference: TreeData?.trunkCircumference
        }
    });

    useEffect(() => {
        setValue('name', TreeData?.name as string)
        setValue('species', TreeData?.species as string)
        setValue('yearPlanted', TreeData?.yearPlanted ? new Date(TreeData?.yearPlanted).toISOString() : new Date().toISOString())
        setValue('height', TreeData?.height as number)
        setValue('trunkCircumference', TreeData?.trunkCircumference as number)
    }, [TreeData])

    const name = watch('name')
    const species = watch('species')
    const yearPlanted = watch('yearPlanted')
    const height = watch('height')
    const trunkCircumference = watch('trunkCircumference')

    const onSubmit = (data: EditTreeForm) => {

    }

    return (
        <>

            <Modal isOpen={open} onClose={closeForm}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update your tree</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="flex flex-col gap-4 py-10">
                            <div className="">
                                <FormFieldInput
                                    name="name"
                                    value={name}
                                    label="Common name"
                                    type="text"
                                    placeholder=""
                                    error={errors.name}
                                    onChange={(val: string) => setValue('name', val)}
                                />
                            </div>
                            <div className="">
                                <FormFieldInput
                                    name="species"
                                    value={species}
                                    label="Species"
                                    type="text"
                                    placeholder=""
                                    error={errors.species}
                                    onChange={(val: string) => setValue('species', val)}
                                />
                            </div>
                            <div className="flex flex-row gap-2">
                                <Tag>Species 1</Tag>
                                <Tag>Species 1</Tag>
                                <Tag>Species 1</Tag>
                            </div>
                            <div className="">
                                <Text className="text-[12px]"> The year planted </Text>
                                <DatePicker
                                    className="focus:border-[#44639F] border bottom-1 w-full inline-flex h-[40px] items-center justify-center rounded-[4px] px-[15px] text-[15px] leading-none outline-none"
                                    selected={new Date(yearPlanted)}
                                    onChange={(date: Date) => setValue('yearPlanted', date.toISOString())} //only when value has changed
                                />
                            </div>
                            <div className="">
                                <FormFieldInput
                                    name="height"
                                    value={height}
                                    label="Tree height in inches"
                                    type="number"
                                    placeholder=""
                                    error={errors.height}
                                    onChange={(val: string) => setValue('species', val)}
                                />
                            </div>
                            <div className="">
                                <FormFieldInput
                                    name="trunkCircumference"
                                    value={trunkCircumference}
                                    label="Trunk Circumference in inches"
                                    type="number"
                                    placeholder=""
                                    error={errors.trunkCircumference}
                                    onChange={(val: number) => setValue('trunkCircumference', val)}
                                />
                            </div>
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                className="w-full h-[40px]"
                                loading={false}
                                text="Edit Tree"
                            />
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>

    )

}