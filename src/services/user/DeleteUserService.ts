import { getRepository } from 'typeorm';
import ApiError from '../../errors/ApiError';
import User from '../../models/User';

interface Request {
  authenticatedUserId: string;
  userId: string;
}

class DeleteUserService {
  async execute({ authenticatedUserId, userId }: Request): Promise<void> {
    if (authenticatedUserId !== userId) {
      throw new ApiError('Unauthorized operation!', 403);
    }

    const repository = getRepository(User);

    const user = await repository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new ApiError('User not found!', 401);
    }

    await repository.delete(userId);
  }
}

export default DeleteUserService;
