import axios from 'axios';
import exp from 'constants';



class SuggestionService {

    private static token = process.env.TREFLE_API_TOKEN;
    private static baseUrl = 'https://trefle.io/api/v1/plants/search';

    constructor() {
    }

    async getSuggestions(input: string): Promise<string[]> {
        try {
            const response = await axios.get(`${SuggestionService.baseUrl}?token=${SuggestionService.token}=${input.includes('tree') ? input : input + 'tree'}`);
            // response is JSON object with data property
            const data = response.data;
            // data is an array of objects
            const suggestions = data.map((item: any) => item.scientific_name);

            return suggestions;

        } catch (error) {
            console.error('Error getting suggestions:', error);
            throw error;
        }
    }
}

export const suggestionService = new SuggestionService();