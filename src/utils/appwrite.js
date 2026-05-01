import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client };

/**
 * Helper for OTP Authentication
 * @param phone Phone number in E.164 format
 */
export const startPhoneSession = async (phone) => {
    try {
        return await account.createPhoneSession('unique()', phone);
    } catch (error) {
        console.error('Appwrite OTP Error:', error);
        throw error;
    }
};

/**
 * Verify OTP
 * @param userId User ID returned from startPhoneSession
 * @param secret OTP Code
 */
export const verifyOTP = async (userId, secret) => {
    try {
        return await account.updatePhoneSession(userId, secret);
    } catch (error) {
        console.error('Appwrite Verification Error:', error);
        throw error;
    }
};
