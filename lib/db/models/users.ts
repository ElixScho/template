import { dbQuery } from '../index';

export interface User {
    id: string;
    email: string;
    created_at: string;
    // Add other user fields here
}

export async function getUser(userId: string) {
    return dbQuery<User>(async (supabase) => 
        supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single()
    );
}

export async function updateUser(userId: string, data: Partial<User>) {
    return dbQuery<User>(async (supabase) => 
        supabase
            .from('users')
            .update(data)
            .eq('id', userId)
            .select()
            .single()
    );
}

export async function deleteUser(userId: string) {
    return dbQuery<User>(async (supabase) => 
        supabase
            .from('users')
            .delete()
            .eq('id', userId)
            .select()
            .single()
    );
}

export async function listUsers() {
    return dbQuery<User[]>(async (supabase) => 
        supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false })
    );
}
