import { createClient } from "@/lib/utils/supabase/server"
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import ClientProviders from './providers/client-providers'

import { redirect } from 'next/navigation';


export default async function Layout({ children }: { children: React.ReactNode }) {
    const supabase = createClient()
    const queryClient = new QueryClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/sign-in')
    } else {
        redirect('/app/dashboard')
    }

    return (
        <ClientProviders>
            <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
        </ClientProviders>
    )
}