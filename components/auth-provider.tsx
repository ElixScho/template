'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';

export function AuthProvider() {
    const [supabase] = useState(() =>
        createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
    );

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token !== undefined) {
                fetch('/auth/callback', {
                    method: 'POST',
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                    credentials: 'same-origin',
                    body: JSON.stringify({ event, session }),
                });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);

    return null;
}
