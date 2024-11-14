import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import PricingCard from '@/app/pricing/pricing-card';

export default async function PricingPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/sign-in');
    }

    const plans = [
        {
            name: 'Basic Plan',
            price: '0',
            features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
            buttonText: 'Start Free',
            priceId: null,
        },
        {
            name: 'Premium Plan',
            price: '9.99',
            features: [
                'All Basic Features',
                'Premium Feature 1',
                'Premium Feature 2',
                'Premium Feature 3',
                'Premium Feature 4',
            ],
            buttonText: 'Get Premium',
            priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
            popular: true,
        },
    ];

    return (
        <div className="flex flex-col items-center py-20 gap-8">
            <div className="text-center max-w-3xl">
                <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
                <p className="text-muted-foreground">
                    Choose the perfect plan for your needs. Upgrade or downgrade at any time.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full px-4">
                {plans.map(plan => (
                    <PricingCard
                        key={plan.name}
                        plan={plan}
                        userEmail={user.email || ''}
                    />
                ))}
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground max-w-2xl">
                <p>
                    All plans include our standard features. Premium plans unlock additional
                    features and priority support.
                </p>
            </div>
        </div>
    );
}
