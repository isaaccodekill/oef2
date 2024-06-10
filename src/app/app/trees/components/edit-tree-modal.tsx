import Button from "@/components/ui/button"
import FormFieldInput from "@/components/ui/form-field-input";
import { CreateTreeForm, EditTreeForm } from "@/types";
import { Modal, ModalBody, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure, ModalHeader, Tag } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { tree } from "next/dist/build/templates/app-page";
import { useEffect, useState, useCallback, use } from "react";
import { Text } from "@/components/ui/text";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateTree } from "@/lib/hooks/trees";
import { useToast } from "@chakra-ui/react";
import useGetSuggestions from "@/lib/hooks/useGetSuggestions";
import { debounce } from 'lodash'
import { useQueryClient } from "@tanstack/react-query";
import { suggestionsKeys } from "@/lib/react-query/query-keys";

export default function EditTreeModal({ TreeData, onClosed, open, }: { open: boolean, TreeData: EditTreeForm | null, id: string | null, onClosed: () => void }) {


    const toast = useToast()
    const queryClient = useQueryClient()

    const editSchema = z.object({
        name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
        species: z.string().min(3, { message: 'Species must be at least 3 characters long' }),
        yearPlanted: z.string(),
        height: z.number().min(1, { message: 'Height must be at least 1 inch' }),
        trunkCircumference: z.number().min(1, { message: 'Trunk circumference must be at least 1 inch' }),
    })

    const {
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        defaultValues: {
            name: TreeData?.name,
            species: TreeData?.species,
            yearPlanted: TreeData?.yearPlanted ? new Date(TreeData?.yearPlanted).toISOString() : new Date().toISOString(),
            height: TreeData?.height,
            trunkCircumference: TreeData?.trunkCircumference
        },
        resolver: zodResolver(editSchema)
    });

    useEffect(() => {
        if(!TreeData) return
        setValue('name', TreeData?.name as string)
        setValue('species', TreeData?.species as string)
        setValue('yearPlanted', TreeData?.yearPlanted as string)
        setValue('height', TreeData?.height as number)
        setValue('trunkCircumference', TreeData?.trunkCircumference as number)
    }, [TreeData])

    const name = watch('name')
    const species = watch('species')
    const yearPlanted = watch('yearPlanted')
    const height = watch('height')
    const trunkCircumference = watch('trunkCircumference')



    const [suggestionQuery, setSuggestionQuery] = useState<string>('')


    const { data: suggestions, isLoading, error, refetch } = useGetSuggestions(suggestionQuery)


    const debouncedUpdateSuggestionQuery = useCallback(debounce((val) => {
        queryClient.cancelQueries({ queryKey: suggestionsKeys.list(val) })
        setSuggestionQuery(val)
    }, 500), [])

    useEffect(() => {
        debouncedUpdateSuggestionQuery(name)
    }, [name])

    const closeForm = () => {
        onClosed()
        queryClient.invalidateQueries({queryKey: suggestionsKeys.list(suggestionQuery)})
    }

    const onSuccessfulEdit = () => {
        closeForm()
        toast({
            title: "Success",
            description: "Successfully edited tracking data",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }


    const editMutation = useUpdateTree(onSuccessfulEdit)


    const schema = z.object({
        name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
        species: z.string().min(3, { message: 'Species must be at least 3 characters long' }),
        yearPlanted: z.string(),
        height: z.number().min(1, { message: 'Height must be at least 1 inch' }),
        trunkCircumference: z.number().min(1, { message: 'Trunk circumference must be at least 1 inch' }),
    })

    const onSubmit = (data: z.infer<typeof schema>) => {
        editMutation.mutate({ ...data, id: TreeData?.id as string })
    }

    const renderSuggestions = () => {
        if (!suggestionQuery || error) return null
        if (isLoading) return (<div className="h-[20px] rounded-md bg-gray-100 animate-pulse w-full" />)
        if (suggestions && suggestions?.length > 0) {
            return (
                <>
                    <Text className="text-[10px]">
                        Suggestions species:
                    </Text>
                    <div className="flex flex-row flex-wrap gap-2 mb-6">
                        {suggestions.filter(s => s).slice(0, 5).map(s =>
                            <Tag key={s} className="cursor-pointer hover:bg-slate-200" onClick={() => setValue('species', s)}>{s}</Tag>
                        )}
                    </div>
                </>
            )
        }
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
                            {renderSuggestions()}
                            <div className="">
                                <Text className="text-[12px]"> The year planted </Text>
                                <DatePicker
                                    showMonthDropdown
                                    showYearDropdown
                                    placeholderText="Select estimated date planted"
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
                                    onChange={(val: number) => setValue('height', parseInt(val.toString()))}
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
                                    onChange={(val: number) => setValue('trunkCircumference', parseInt(val.toString()))}
                                />
                            </div>
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                className="w-full h-[40px]"
                                loading={editMutation.isPending}
                                text="Edit Tree"
                            />
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>

    )

}