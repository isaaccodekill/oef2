import { CreateAccountForm } from "@/types"
import { createClient } from "../utils/supabase/client"
import { useMutation } from "@tanstack/react-query"
import { Toast, useToast } from "@chakra-ui/react"
import http from "../utils/http"



export const useSignIn = (onSuccess: () => void) => {
    const client = createClient()
    const toast = useToast()

    const signIn = async ({ email, password }: { email: string, password: string }) => {
        const { error, data: session } = await client.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            throw error
        }
    }

    return useMutation({
        mutationFn: signIn,
        onSuccess: () => {
            onSuccess()
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    })
}


export const useSignOut = () => {
    const client = createClient()
    const toast = useToast()

    const signOut = async () => {
        await client.auth.signOut()
    }

    return useMutation({
        mutationFn: signOut,
        onSuccess: () => {

        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    })
}

export const useSignUp = (onSuccess: () => void) => {
    const client = createClient()
    const toast = useToast()

    const signUp = async (data: CreateAccountForm) => {
        const { error, data: session } = await client.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    first_name: data.firstName,
                    last_name: data.lastName,
                }
            }
        })

        if (error) {
            throw error
        }
        const user = await http.post("/user", JSON.stringify(
            {
                id: session?.user?.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                street: data.street
            }
        ))
    }

    return useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Account created successfully",
                status: "success",
                duration: 3000,
                isClosable: true,

            })
            onSuccess()
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    })
}