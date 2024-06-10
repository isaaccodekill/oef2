'use client'

import { Text } from "@/components/ui/text";
import { Card, CardHeader, CardBody, StackDivider, Stack, Box, Button, Skeleton } from '@chakra-ui/react'
import { format, set } from 'date-fns'
import EditTreeModal from "./edit-tree-modal";
import { EditTreeForm } from "@/types";
import { useState, useMemo } from "react";
import CreateTreeModal from "./create-tree-modal";
import { useGetTrees } from '@/lib/hooks/trees'
import { Tree } from "./tree";


export default function TreesList() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedTree, setSelectedTree] = useState<EditTreeForm & { id: string } | null>(null)
    const closeEditModal = () => {
        setIsModalOpen(false)
        setSelectedTree(null)
    }

    const { data: trees, error, isLoading } = useGetTrees()

    const sortedTrees = useMemo(() => {
        // Create a sorted copy
        if(trees){
            return [...trees].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        return []
       }, [trees]); // Recalculate sortedTrees only when 'trees' changes
      

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex w-full gap-4 mt-10 flex-wrap">
                    <div className="h-[200px] rounded-md w-[200px]">
                        <Skeleton height='200px' />
                    </div>
                    <div className="h-[200px] rounded-md w-[200px]">
                        <Skeleton height='200px' />
                    </div>
                    <div className="h-[200px] rounded-md w-[200px]">
                        <Skeleton height='200px' />
                    </div>
                </div>
            )
        }
        else if (sortedTrees?.length > 0) {
            return (<>
                <div className="flex justify-center items-center flex-col gap-4">
                    <Text size='xl' weight="bold" className="text-[40px]"> View trees you've tracked </Text>
                    <Button onClick={() => setIsCreateModalOpen(true)} colorScheme="blue">Add a tree</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-10">
                    {sortedTrees?.map(tree => (
                        <Tree tree={tree} editFunction={(tree) => {
                            setIsModalOpen(true)
                            setSelectedTree({
                                ...tree,
                                yearPlanted: format(tree.yearPlanted, 'yyyy-MM-dd'),
                            })
                        }} />
                    ))}
                </div>
            </>
            )
        } else {
            return (
                <div className="flex justify-center items-center flex-col gap-4">
                    <Text size='xl' weight="bold" className="text-[40px]">No trees found</Text>
                    <Button onClick={() => setIsCreateModalOpen(true)} colorScheme="blue">Add a tree</Button>
                </div>
            )
        }
    }


    return (
        <div className="py-10 px-10">
            {renderContent()}
            <EditTreeModal id={selectedTree?.id as string} open={isModalOpen} onClosed={closeEditModal} TreeData={selectedTree} />
            <CreateTreeModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div >
    );
}