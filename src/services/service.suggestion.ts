import axios from 'axios';
import exp from 'constants';
import 'dotenv/config';
import { unknown } from 'zod';

class SuggestionService {

    private static token: string
    private static baseUrl = 'https://trefle.io/api/v1/plants/search';

    constructor() {
        SuggestionService.token = process.env.TREFFLE_API_KEY as string;
    }

    async getSuggestions(input: string): Promise<string[]> {
        try {
            const response = await axios.get(`${SuggestionService.baseUrl}?token=${SuggestionService.token}&q=${input.includes('tree') ? input : input + ' tree'}`);
            // response is JSON object with data property
            const data = response.data.data;
            // data is an array of objects
            const suggestions = data.map((item: any) => item.scientific_name);

            return suggestions;

        } catch (error: any) {
            console.error('Error getting suggestions:', error?.data?.message);
            throw error;
        }
    }
}

export const suggestionService = new SuggestionService();