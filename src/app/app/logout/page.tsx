'use client'
import { useEffect } from 'react';
import { createClient } from '@/lib/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const LogoutPage = () => {
    const supabase = createClient();
    const router = useRouter();
    const queryClient = useQueryClient();
    useEffect(() => {
        const logout = async () => {
            queryClient.clear();
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error.message);
            }
        };
        logout();
        setTimeout(() => {
            router.push('/auth/sign-in');
        })
    }, []);

    return <div>Logging out...</div>;
};

export default LogoutPage;