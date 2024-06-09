import { createClient } from "../utils/supabase/client"
import { useQuery } from "@tanstack/react-query"

export const useGetUserInfo = () => {
    const client = createClient();
    // extract the user info from the session
    const getUserInfo = async () => {

        const { data, error: sessionError } = await client.auth.getSession();

        if (sessionError) {
            throw sessionError;
        }

        return data?.session?.user;
    }

    return useQuery({
        queryKey: ["user"],
        queryFn: getUserInfo,
    })

}