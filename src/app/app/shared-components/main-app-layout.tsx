'use client'

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils/css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@chakra-ui/react";

export default function MainAppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;


    return (<div className="h-screen overflow-hidden flex flex-col bg-white">
        <div className="flex justify-between  items-center p-4 border bottom-1 gap-2">
            <Link href="/app/dashboard">
                <img src="/nature.png" className="h-[20px]" />
                <Text size="md" weight="semibold" variant="primary">Tree Tracker</Text>
            </Link>
            <div className="flex items-center gap-4">
                <Link href="/app/trees" className={cn(isActive("/app/trees") && 'underline', "text-[#2B6CB0]")} >
                    <Text size="md" className="!text-current" weight="semibold" variant="primary">Trees</Text>
                </Link>
                <Link href="/app/profile">
                    <Avatar name='Jon Doe' />
                </Link>
                <div className="ml-10">
                    <Link href="/app/logout">
                        <Text size="sm" className="!text-current text-[#2B6CB0]" weight="semibold" variant="primary">Sign out</Text>
                    </Link>
                </div>
            </div>
        </div>
        <div className="flex-grow overflow-auto overflow-x-hidden">
            {children}
        </div>
    </div>)
}