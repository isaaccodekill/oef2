import { Card, CardHeader, CardBody, Stack, StackDivider, Box, Button } from "@chakra-ui/react"
import { Text } from "@/components/ui/text"
import { TreeData } from "@/types"
import { format } from "date-fns"

export const Tree = ({ tree, editFunction }: { tree: TreeData, editFunction: (tree: TreeData) => void }) => {
    return (
        <Card key={tree.id} className="!border !shadow-none bottom-1">
            <CardHeader>
                <Text size='lg'>{tree.name}</Text>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box className="">
                        <Text size='sm'> <Text weight="bold"> Species: </Text>  {tree.species}</Text>
                    </Box>
                    <Box className="">
                        <Text size='sm'> <Text weight="bold"> Date added: </Text>  {format(tree.createdAt, "yyyy-MM-dd")}</Text>
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