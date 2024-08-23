import logger from '../logger';
import { UserModel } from '../models/userModel';

export const uploadBioService = async (userId: string, bio: string) => {
    try {
        if (!bio) {
            throw new Error('Bio is missing!');
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { bio },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('User not found!');
        }

        return updatedUser;
    } catch (error) {
        logger.error(`Upload Bio Service Error: ${error}`);
        throw error;
    }
};
