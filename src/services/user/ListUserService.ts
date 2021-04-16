import { getRepository } from 'typeorm';
import ApiError from '../../errors/ApiError';
import User from '../../models/User';

interface Request {
  authenticatedUserId: string;
  userId: string;
}

class ListUserService {
  async execute({ authenticatedUserId, userId }: Request): Promise<User> {
    if (authenticatedUserId !== userId) {
      throw new ApiError('Unauthorized operation!', 403);
    }

    const repository = getRepository(User);

    const user = await repository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new ApiError('User not found!', 400);
    }

    delete user.password;

    return user;
  }
}

export default ListUserService;
