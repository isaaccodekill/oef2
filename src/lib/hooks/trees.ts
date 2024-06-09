import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { treesKeys } from '../react-query/query-keys';
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
        onSuccess: () => {
            const key = treesKeys.list();
            queryClient.invalidateQueries({ queryKey: key });
            onSuccess()
        },
        onError: (e) => {
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
export function useUpdateTree() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updatedTreeData: EditTreeForm & { id: string }) => axios.put(`${API_URL}/${updatedTreeData.id}`, updatedTreeData),
        onSuccess: () => {
            const key = treesKeys.list();
            queryClient.invalidateQueries({ queryKey: key });
        },
    });
}

// Hook to delete a tree
export function useDeleteTree() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => axios.delete(`${API_URL}/${id}`),
        onSuccess: () => {
            const key = treesKeys.list();
            queryClient.invalidateQueries({ queryKey: key });
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