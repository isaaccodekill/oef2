import Button from "@/components/ui/button"
import FormFieldInput from "@/components/ui/form-field-input";
import { CreateTreeForm } from "@/types";
import { Modal, ModalBody, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure, ModalHeader, Tag } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

export default function CreateTreeModal({ open, onClose }: { open: boolean, onClose: () => void }) {



  const {
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    setError,
  } = useForm<CreateTreeForm>({
    defaultValues: {
      name: '',
      species: '',
      yearPlanted: new Date().toISOString(),
      height: 0,
      trunkCircumference: 0
    }
  });

  const name = watch('name')
  const species = watch('species')
  const yearPlanted = watch('yearPlanted')
  const height = watch('height')
  const trunkCircumference = watch('trunkCircumference')

  const onSubmit = (data: CreateTreeForm) => {

  }

  return (
    <>
      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a tree</ModalHeader>
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
                text="Create Tree"
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>

  )

}