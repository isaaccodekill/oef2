import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { treesKeys } from '../react-query/query-keys';
import { EditTreeForm, TreeData } from '@/types';

const API_URL = '/trees';

// Hook to create a tree
export function useCreateTree() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newTreeData) => axios.post(API_URL, newTreeData),
        onSuccess: () => {
            const key = treesKeys.list();
            queryClient.invalidateQueries({ queryKey: key });
        },
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
            const response = await axios.get(API_URL);
            return response.data;
        },
    });
}