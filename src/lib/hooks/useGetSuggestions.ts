import { useQuery } from '@tanstack/react-query';
import http from '../utils/http';
import { suggestionsKeys } from '../react-query/query-keys';


const useGetSuggestions = (input: string) => {
    const fetchSuggestions = async (signal: AbortSignal): Promise<string[]> => {
        // Call your suggestion service here and pass the input as a parameter
        const response = await http.get(`/suggestions?input=${input}`, {
            signal
        });
        return response.data;
    };

    // react query hook to fetch suggestions
    return useQuery({
        queryKey: suggestionsKeys.list(input),
        queryFn: ({ signal }) => fetchSuggestions(signal),
        enabled: !!input
    });

};

export default useGetSuggestions;