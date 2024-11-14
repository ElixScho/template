'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { getStripe } from '@/utils/stripe';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface PricingCardProps {
    plan: {
        name: string;
        price: string;
        features: string[];
        buttonText: string;
        priceId: string | null;
        popular?: boolean;
    };
    userEmail: string;
}

export default function PricingCard({ plan, userEmail }: PricingCardProps) {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        try {
            setLoading(true);

            if (!plan.priceId) return; // Free plan

            // First create a checkout session
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: plan.priceId,
                    mode: 'subscription',
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            const { sessionId } = await response.json();

            if (!sessionId) throw new Error('No session ID returned');

            // Then redirect to checkout
            const stripe = await getStripe();
            if (!stripe) throw new Error('Stripe not initialized');

            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) throw error;
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className={`${plan.popular ? 'border-primary' : ''}`}>
            <CardHeader>
                {plan.popular && (
                    <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full w-fit">
                        Beliebt
                    </span>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-2">
                    <span className="text-3xl font-bold">€{plan.price}</span>
                    {plan.price !== '0' && <span className="text-muted-foreground">/Monat</span>}
                </div>
            </CardHeader>

            <CardContent>
                <ul className="flex flex-col gap-4">
                    {plan.features.map(feature => (
                        <li
                            key={feature}
                            className="flex items-center gap-2"
                        >
                            <Check
                                size={16}
                                className="text-primary"
                            />
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                >
                    {loading ? 'Loading...' : plan.buttonText}
                </Button>
            </CardFooter>
        </Card>
    );
}
