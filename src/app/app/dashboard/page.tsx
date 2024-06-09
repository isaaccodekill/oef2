'use client'
import { Card } from "@chakra-ui/react"
import { Text } from "@/components/ui/text"
import {
    Skeleton,
    Select
} from '@chakra-ui/react'
import { useGetDashboardData, useGetAnalysisData } from "@/lib/hooks/dashboard"
import { useEffect, useState } from "react"
import { Toast, useToast } from "@chakra-ui/react"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';




export default function DashboardPage() {

    // get dash data

    const [years, setYears] = useState(1)

    const toast = useToast()
    const { data, error, isLoading } = useGetDashboardData()
    const { data: analysisData, error: analysisError, isLoading: analysisLoading } = useGetAnalysisData({ noYears: 5 })

    useEffect(() => {
        if (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }, [error])


    return (
        <div className="px-10 py-10">
            <Text size="2xl" weight="bold">Welcome to tree Tracker</Text>
            <div className="flex gap-4 mt-10 flex-wrap">
                {
                    isLoading ? (
                        <>
                            <div className="h-[200px] rounded-md w-[200px]">
                                <Skeleton height='200px' />
                            </div>
                            <div className="h-[200px] rounded-md w-[200px]">
                                <Skeleton height='200px' />
                            </div>
                            <div className="h-[200px] rounded-md w-[200px]">
                                <Skeleton height='200px' />
                            </div>
                        </>
                    ) : (
                        <>
                            <Card className="!border !shadow-none border-1 p-10">
                                <Text size="md">Total trees tracked city wide</Text>
                                <Text className="text-[40px]" weight="bold">{data?.totalTrees}</Text>
                            </Card>
                            <Card className="!border !shadow-none border-1 p-10">
                                <Text size="md">Total trees you've tracked</Text>
                                <Text className="text-[40px]" weight="bold">{data?.userTrees}</Text>
                            </Card>
                            <Card className="!border !shadow-none border-1 p-10">
                                <Text size="md">Average height of trees in city</Text>
                                <Text className="text-[40px]" weight="bold">{data?.averageHeight}
                                </Text>
                            </Card>
                            <Card className="!border !shadow-none border-1 p-10">
                                <Text size="md">Most common species</Text>
                                {
                                    data?.commonSpecies?.length as number > 0 ? data?.commonSpecies.map((species, index) => (
                                        <div key={index} className="flex justify-between">
                                            <Text>{species.species}</Text>
                                            <Text>{species.count}</Text>
                                        </div>
                                    ))
                                        : <Text className="text-[40px]" weight="bold">Not enough Data</Text>
                                }
                            </Card>
                        </>
                    )
                }
            </div>
            <div className="flex flex-col gap-4 mt-10">
                {
                    analysisLoading ? (
                        <div className="h-[200px] rounded-md w-full">
                            <Skeleton height='300px' />
                        </div>
                    ) : (
                        <Card className="!border !shadow-none border-1 p-10 w-full">
                            <div className="flex justify-between">
                                <Text size="md">Total trees tracked over time all time</Text>
                                <Select placeholder='Select range' width={200} value={years} size='md'>
                                    <option value={Infinity}>All time</option>
                                    <option value={1}>Last 1 year</option>
                                    <option value={5}>Last 5 years</option>
                                    <option value={10}>Last 10 years</option>
                                </Select>
                            </div>
                            {
                                analysisData?.length === 0 ? (
                                    <Text className="text-[40px]" weight="bold">Not enough Data</Text>
                                ) : <ResponsiveContainer width="100%" height={400}>
                                    <LineChart width={1000} height={1000} data={analysisData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" type="number" domain={['dataMin', 'dataMax']} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="trees_planted" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            }
                        </Card>
                    )
                }
            </div>
        </div>
    )
}