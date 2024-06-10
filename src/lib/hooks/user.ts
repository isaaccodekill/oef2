import { UserInfo } from "os";
import { createClient } from "../utils/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { UserContext } from "../utils/auth";
import http from "../utils/http";

export const useGetUser = () => {
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

export const useGetUserInfo = () => {

    const fetchUserInfo = async (): Promise<UserContext> => {
        const response = await http.get('/user');
        return response.data;
    }

    return useQuery({
        queryKey: ["userInfo"],
        queryFn: fetchUserInfo,
    })
}