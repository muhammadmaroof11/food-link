import { databases } from '../utils/appwrite';
import { ID } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'foodlink_db';
const ORDERS_COLLECTION = 'orders';

export class OrderService {
    /**
     * Helper to get the base cashback rate based on User Level
     */
    static getBaseCashbackRate(level) {
        switch (level) {
            case 'Bronze': return 0.02; // 2%
            case 'Silver': return 0.04; // 4%
            case 'Gold': return 0.07; // 7%
            case 'Platinum': return 0.10; // 10%
            default: return 0.02;
        }
    }

    /**
     * Calculates the total cashback earned for an order, factoring in flash sales
     */
    static calculateCashback(items, userLevel) {
        const baseRate = this.getBaseCashbackRate(userLevel);
        let totalCashback = 0;

        for (const item of items) {
            const itemTotal = item.price_credits * item.quantity;
            if (item.is_flash_sale && item.special_cashback_rate) {
                totalCashback += itemTotal * item.special_cashback_rate;
            } else {
                totalCashback += itemTotal * baseRate;
            }
        }

        return totalCashback;
    }

    /**
     * Mocks placing an order
     */
    static async placeOrder(userId, items, totalCredits, userLevel) {
        try {
            const cashbackEarned = this.calculateCashback(items, userLevel);
            const bookingFee = totalCredits * 0.10; // Example 10% booking fee

            console.log(`[Mock Order] Placing order for User ${userId}`);
            console.log(`[Mock Order] Total: ₢${totalCredits}, Booking Fee: ₢${bookingFee}`);
            console.log(`[Mock Order] Estimated Cashback: ₢${cashbackEarned}`);

            // TODO: Replace with Appwrite document creation
            /*
            const order = await databases.createDocument(DATABASE_ID, ORDERS_COLLECTION, ID.unique(), {
                customer_id: userId,
                restaurant_id: 'rest_1', 
                items_json: JSON.stringify(items),
                total_credits: totalCredits,
                booking_fee: bookingFee,
                payment_method: 'wallet',
                status: 'pending',
                delivery_address: 'Dubai Marina',
                cashback_earned: cashbackEarned,
                created_at: new Date().toISOString()
            });
            return order.$id;
            */
           
            // Return a mock ID
            return `mock_order_${Date.now()}`;
        } catch (error) {
            console.error('Error placing order:', error);
            return null;
        }
    }
}
