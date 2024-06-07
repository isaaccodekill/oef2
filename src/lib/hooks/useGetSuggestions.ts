import { useQuery } from '@tanstack/react-query';

const useGetSuggestions = (input: string) => {
    const fetchSuggestions = async () => {
        // Call your suggestion service here and pass the input as a parameter
        const response = await fetch(`https://api.example.com/suggestions?input=${input}`);
        const data = await response.json();
        return data;
    };

};

export default useGetSuggestions;