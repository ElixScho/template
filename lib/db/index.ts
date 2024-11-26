import { createClient } from '@/utils/supabase/server';

export async function createServerSupabaseClient() {
    return createClient();
}

// Example of a generic type-safe database query function
export async function dbQuery<T>(
    queryFn: (supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>) => Promise<{ data: T | null; error: any }>
) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await queryFn(supabase);
    
    if (error) {
        throw new Error(`Database error: ${error.message}`);
    }
    
    return data;
}
