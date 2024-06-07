'use client'
import { Card } from "@chakra-ui/react"
import { Text } from "@/components/ui/text"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'



export default function DashboardPage() {
    return (
        <div className="px-10 py-10">
            <Text size="2xl" weight="bold">Welcome to tree Tracker</Text>
            <div className="flex gap-4 mt-10">
                <Card className="!border !shadow-none border-1 p-10">
                    <Text size="md">Total trees tracked city wide</Text>
                    <Text className="text-[40px]" weight="bold">1000</Text>
                </Card>
                <Card className="!border !shadow-none border-1 p-10">
                    <Text size="md">Most common species</Text>
                    <Text className="text-[40px]" weight="bold">Arigulata</Text>
                </Card>
            </div>
            <div className="flex gap-4 mt-10">
                <Card className="!border !shadow-none border-1 p-10 w-full">
                    <div className="flex justify-between">
                        <Text size="md">Total trees tracked over time all time</Text>
                        <Menu>
                            <MenuButton className="px-[15px] py-[10px] border border-1 rounded-md hover:border-blue-200" as={"button"} rightIcon={<ChevronDownIcon />}>
                                Actions
                            </MenuButton>
                            <MenuList>
                                <MenuItem>All time</MenuItem>
                                <MenuItem>Last 30 days</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </Card>
            </div>
        </div>
    )
}