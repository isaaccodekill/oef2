import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { dashboardKeys, treesKeys } from '../react-query/query-keys';
import { CreateTreeForm, EditTreeForm, TreeData } from '@/types';
import http from '../utils/http';
import { useToast } from '@chakra-ui/react';

const API_URL = '/tree';

// Hook to create a tree
export function useCreateTree(onSuccess: () => void) {
    const queryClient = useQueryClient();
    const toast = useToast()

    return useMutation({
        mutationFn: (newTreeData: CreateTreeForm) => http.post(API_URL, newTreeData),
        onMutate: async (variables) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            const queryKey = treesKeys.list();
            await queryClient.cancelQueries({ queryKey });

            // Snapshot the previous value
            const previousValue = queryClient.getQueryData<TreeData[]>(treesKeys.list());

            // Optimistically update to the new value
            if (previousValue) {
                queryClient.setQueryData(treesKeys.list(), [...previousValue, {...variables, createdAt: new Date().toISOString()}]);
            }

            return { previousValue };
        },
        onSuccess: () => {
            const key = treesKeys.list();
            queryClient.invalidateQueries({ queryKey: key });
            queryClient.invalidateQueries({ queryKey: dashboardKeys.text() });
            onSuccess()
        },
        onError: (e) => {
            const key = treesKeys.list();
            queryClient.invalidateQueries({ queryKey: key });
            toast(
                {
                    status: "error",
                    title: e.message,
                    duration: 3000
                }
            )
        }
    });
}

// Hook to update a tree
export function useUpdateTree(onSuccess: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updatedTreeData: EditTreeForm & { id: string }) => http.put(`${API_URL}/${updatedTreeData.id}`, updatedTreeData),
        onMutate: (variables) => {
            const queryKey = treesKeys.list();
            queryClient.cancelQueries({ queryKey });
            queryClient.setQueryData(queryKey, (oldData: TreeData[] | undefined) => {
                return oldData?.map((tree) => {
                    if (tree.id === variables.id) {
                        return { ...tree, ...variables };
                    }
                    return tree;
                }) || [];
            })

        },
        onSuccess: () => {
            const key = treesKeys.list();
            queryClient.invalidateQueries({ queryKey: key });
            onSuccess()
        },
    });
}

// Hook to delete a tree
export function useDeleteTree(onSuccess: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => http.delete(`${API_URL}/${id}`),
        onMutate: (id) => {
            let queryKey = treesKeys.list();
            queryClient.setQueryData(queryKey, (oldData: TreeData[] | undefined) => {
                return oldData?.filter((tree) => tree.id !== id) || [];
            });

        },
        onSuccess: () => {
            const key = treesKeys.list();
            queryClient.invalidateQueries({ queryKey: key });
            queryClient.invalidateQueries({ queryKey: dashboardKeys.text() });
            onSuccess()
        },
    });
}

// Hook to get all trees
export function useGetTrees() {
    return useQuery({
        queryKey: treesKeys.list(),
        queryFn: async (): Promise<TreeData[]> => {
            const response = await http.get(API_URL);
            return response.data;
        },
    });
}