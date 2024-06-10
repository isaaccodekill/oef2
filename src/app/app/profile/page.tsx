'use client'

import { Text } from "@/components/ui/text"
import { useGetUserInfo } from "@/lib/hooks/user"
import { Skeleton } from "@chakra-ui/react"

export default function ProfilePage() {
    const { data, isPending } = useGetUserInfo()

    return <>
        <div className="px-10 py-10">
            {
                isPending && <Skeleton height='200px' />
            }
            {
                data && <>
                    <Text size="2xl" weight="bold">Hello {data?.firstName} {data?.lastName}</Text>
                    <div className="mt-10">
                        <Text size="md" weight="bold">Your Address is</Text>
                        <div className="border border-1 px-10 py-10 mt-4">
                            <Text size="md">{data?.addresses[0].street}</Text>
                        </div>
                    </div>
                </>
            }
        </div>

    </>
}