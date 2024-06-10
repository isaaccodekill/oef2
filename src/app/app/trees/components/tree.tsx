import { Card, CardHeader, CardBody, Stack, StackDivider, Box, Button } from "@chakra-ui/react"
import { DeleteIcon, SpinnerIcon } from '@chakra-ui/icons'
import { Text } from "@/components/ui/text"
import { TreeData } from "@/types"
import { format } from "date-fns"
import { useDeleteTree } from "@/lib/hooks/trees"
import { useToast } from "@chakra-ui/react"


export const Tree = ({ tree, editFunction }: { tree: TreeData, editFunction: (tree: TreeData) => void }) => {


    const onSuccessfulDelete = () => {
        toast({
            title: "Success",
            description: "Successfully deleted tree",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    const deleteTree = useDeleteTree(onSuccessfulDelete)
    const toast = useToast()

    const onClickDelete = () => {
        deleteTree.mutate(tree.id)
    }



    return (
        <Card key={tree.id} className="!border !shadow-none bottom-1">
            <CardHeader className="flex justify-between items-center tex-white">
                <Text size='lg'>{tree.name}</Text>
                <Button colorScheme="red" size="sm" className=" flex gap-2 px-[15px] !ml-auto" onClick={onClickDelete}>
                    {deleteTree.isPending ? <SpinnerIcon color="#fff" fill="#ffffff" className="animate-spin" /> : <DeleteIcon color="#fff" />}
                    <Text size='sm' className="!text-white ">Delete</Text>
                </Button>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box className="">
                        <Text size='sm'> <Text weight="bold"> Species: </Text>  {tree.species}</Text>
                    </Box>
                    <Box className="">
                        <Text size='sm'> <Text weight="bold"> Date added: </Text>  {new Date(tree.createdAt).toISOString()} </Text>
                    </Box>
                    <Box className="">
                        <Button onClick={() => {
                            editFunction(tree)
                        }} colorScheme="blue">Edit Tree</Button>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    )
}