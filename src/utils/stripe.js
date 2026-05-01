import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const getStripe = () => stripePromise;

/**
 * Basic helper for tokenization
 * In a real app, you'd use Stripe Elements to collect card info safely
 */
export const createPaymentToken = async (cardElement) => {
    const stripe = await getStripe();
    if (!stripe) throw new Error('Stripe failed to load');

    const result = await stripe.createToken(cardElement);
    if (result.error) {
        throw new Error(result.error.message);
    }
    return result.token;
};
