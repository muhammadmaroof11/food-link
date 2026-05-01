import { account, databases } from '../utils/appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'foodlink_db';
const USERS_COLLECTION = 'users';

export class AuthService {
    /**
     * Gets the current authenticated user's profile from the database.
     * MOCK MODE: Returns a mocked customer profile until backend is connected.
     */
    static async getCurrentUser() {
        try {
            // TODO: Remove mock when backend is fully connected
            return {
                user_id: 'mock_customer_1',
                role: 'customer',
                wallet_balance: 5000.0,
                escrow_balance: 0.0,
                full_name: 'Test Customer',
                level: 'Gold', // Using Gold to show some cashback
                lifetime_credits_earned: 3000.0
            };

            /*
            const user = await account.get();
            const profile = await databases.getDocument(
                DATABASE_ID,
                USERS_COLLECTION,
                user.$id
            );
            return profile;
            */
        } catch (error) {
            console.error('Error fetching current user:', error);
            return null;
        }
    }
}
