import { createClientServer } from "@/lib/utils/supabase/server"
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import ClientProviders from '../providers/client-providers'

import { redirect } from 'next/navigation';


export default async function Layout({ children }: { children: React.ReactNode }) {
    const supabase = createClientServer()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/sign-in')
    } else {
        redirect('/app/dashboard')
    }

    return (
        <ClientProviders>
            {children}
        </ClientProviders>
    )
}