'use server'
import { createClientServer } from "@/lib/utils/supabase/server"
import ClientProviders from '../providers/client-providers'

import { redirect } from 'next/navigation';


export default async function Layout({ children }: { children: React.ReactNode }) {
    const supabase = createClientServer()
    const session = await supabase.auth.getSession()
    const { error, data } = session

    if (error || !data?.session?.user) {
        if (error) {
            console.error(error)
        }
        redirect('/auth/sign-in')
    }

    return (
        <ClientProviders>
            {children}
        </ClientProviders>
    )
}