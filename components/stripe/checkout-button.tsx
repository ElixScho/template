'use client';

import { Button } from '@/components/ui/button';
import { getStripe } from '@/utils/stripe';
import { useState } from 'react';

export default function CheckoutButton() {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        try {
            setLoading(true);

            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { sessionId } = await response.json();
            const stripe = await getStripe();
            await stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleCheckout}
            disabled={loading}
            variant="default"
        >
            {loading ? 'Wird geladen...' : '50 Cent spenden'}
        </Button>
    );
}
