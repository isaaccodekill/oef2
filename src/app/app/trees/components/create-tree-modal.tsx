import Button from "@/components/ui/button"
import FormFieldInput from "@/components/ui/form-field-input";
import { CreateTreeForm } from "@/types";
import { Modal, ModalBody, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure, ModalHeader, Tag, useToast, Text } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import useGetSuggestions from "@/lib/hooks/useGetSuggestions";
import { useCreateTree } from '@/lib/hooks/trees'
import { useEffect, useState, useCallback } from "react";
import { debounce } from 'lodash'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { parse } from "path";
import { useQueryClient } from "@tanstack/react-query";
import { suggestionsKeys } from "@/lib/react-query/query-keys";

export default function CreateTreeModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const queryClient = useQueryClient()

  const toast = useToast()


  const createSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    species: z.string().min(3, { message: 'Species must be at least 3 characters long' }),
    yearPlanted: z.string(),
    height: z.number().min(1, { message: 'Height must be at least 1 inch' }),
    trunkCircumference: z.number().min(1, { message: 'Trunk circumference must be at least 1 inch' }),
  })

  const {
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof createSchema>>({
    defaultValues: {
      name: '',
      species: '',
      yearPlanted: new Date().toISOString(),
      height: 0,
      trunkCircumference: 0
    },
    resolver: zodResolver(createSchema)
  });

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

  const closeCreateModal = () => {
    onClose()
    createMutation.reset()
    reset()
    onClose()

  }

  const onSuccess = () => {
  }

  const createMutation = useCreateTree(onSuccess)




  const onSubmit = (data: CreateTreeForm) => {
    createMutation.mutate(data)
    closeCreateModal()
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
      <Modal isOpen={open} onClose={closeCreateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a tree</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-4 pb-10">
              <div className="">
                <FormFieldInput
                  name="name"
                  value={name}
                  label="Common name"
                  type="text"
                  placeholder="Type a name to get suggested species"
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
                <Text className="text-[12px]"> Select day planted (your best guess) </Text>
                <DatePicker
                  showMonthDropdown
                  showYearDropdown
                  placeholderText="Select estimated date planted"
                  className="focus:border-[#44639F] border bottom-1 w-full inline-flex h-[40px] items-center justify-center rounded-[4px] px-[15px] text-[15px] leading-none outline-none"
                  selected={new Date(yearPlanted)}
                  onChange={(date: Date) => setValue('yearPlanted', date.toISOString())} //only when value has changed
                />
                {errors.yearPlanted && <span className="text-[10px] text-red-300">{errors.yearPlanted.message}</span>}
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
                loading={createMutation.isPending}
                text="Create Tree"
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>

  )

}