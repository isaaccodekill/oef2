'use client'

import { Text } from "@/components/ui/text";
import { Card, CardHeader, CardBody, StackDivider, Stack, Box, Button } from '@chakra-ui/react'
import { format, set } from 'date-fns'
import EditTreeModal from "./edit-tree-modal";
import { EditTreeForm } from "@/types";
import { useState } from "react";
import CreateTreeModal from "./create-tree-modal";


const trees = [
    {
        id: "clhug6v2w00003h686n9i728x",
        name: "Oakley",
        species: "Quercus robur (English Oak)",
        yearPlanted: format(new Date("2010-05-15T10:30:00Z"), 'yyyy-MM-dd'),
        trunkCircumference: 120, // in centimeters
        height: 25, // in meters
        userId: "clhug6v2x00013h68g0tmk010",
        addressId: "clhug6v2y00023h6875x6l000",
        createdAt: new Date("2023-05-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
    },
    {
        id: "clhug6v3400033h68f4z0v8j3",
        name: "Willow Wisp",
        species: "Salix babylonica (Weeping Willow)",
        yearPlanted: format(new Date("2018-11-08T16:22:00Z"), 'yyyy-MM-dd'),
        trunkCircumference: 95,
        height: 18,
        userId: "clhug6v3500043h685t07p000",
        addressId: "clhug6v3600053h684y3q0000",
        createdAt: new Date("2022-11-08T16:22:00Z"),
        updatedAt: new Date("2023-12-03T09:18:00Z"),
    },
];

export default function TreesList() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedTree, setSelectedTree] = useState<EditTreeForm & { id: string } | null>(null)
    const closeEditModal = () => {
        setIsModalOpen(false)
        setSelectedTree(null)
    }

    return (
        <div className="py-10 px-10">
            <div className="mb-10 flex items-center gap-4">
                <Text size="xl" className="" weight="bold">View your trees</Text>
                <Button onClick={() => {
                    setIsCreateModalOpen(true)
                }} colorScheme="blue">Add a new Tree</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {trees.map(tree => (
                    <Card key={tree.id} className="!border !shadow-none bottom-1">
                        <CardHeader>
                            <Text size='md'>{tree.name}</Text>
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
                                        setIsModalOpen(true)
                                        setSelectedTree({ ...tree, id: tree.id })
                                    }} colorScheme="blue">Edit Tree</Button>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                ))}
            </div>
            <EditTreeModal id={selectedTree?.id as string} open={isModalOpen} onClosed={closeEditModal} TreeData={selectedTree} />
            <CreateTreeModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div >
    );
}