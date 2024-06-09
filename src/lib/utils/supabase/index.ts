import { createClient, SupabaseClient } from '@supabase/supabase-js';

class SupabaseSingleton {
    private static instance: SupabaseSingleton;
    private client: SupabaseClient;

    private constructor() {
        // Initialize the Supabase client here
        this.client = ;
    }

    public static getInstance(): SupabaseSingleton {
        if (!SupabaseSingleton.instance) {
            SupabaseSingleton.instance = new SupabaseSingleton();
        }
        return SupabaseSingleton.instance;
    }

    public getClient(): SupabaseClient {
        return this.client;
    }
}

export default client = SupabaseSingleton.getInstance().getClient();