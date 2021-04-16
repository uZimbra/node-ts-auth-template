import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import ApiError from '../../errors/ApiError';
import User from '../../models/User';

interface Request {
  authenticatedUserId: string;
  userId: string;
  name: string;
  email: string;
  password: string;
  role?: number;
}

class UpdateUserService {
  async execute({
    authenticatedUserId,
    userId,
    name,
    email,
    password,
    role,
  }: Request): Promise<User> {
    if (authenticatedUserId !== userId) {
      throw new ApiError('Unauthorized operation!', 403);
    }

    const repository = getRepository(User);

    const user = await repository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new ApiError('User does not exists!', 401);
    }

    const hashedPassword = await hash(password, 8);

    await repository.update(userId, {
      name: name || user.name,
      email: email || user.email,
      password: hashedPassword || user.password,
      role: role || user.role,
    });

    const updatedUser = await repository.findOne({
      where: { userId },
    });

    if (!updatedUser) {
      throw new ApiError('User not found!', 401);
    }

    delete updatedUser.password;

    return updatedUser;
  }
}

export default UpdateUserService;
