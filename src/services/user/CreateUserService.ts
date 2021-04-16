import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import ApiError from '../../errors/ApiError';
import User from '../../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  role?: number;
}

class CreateUserService {
  async execute({ name, email, password, role }: Request): Promise<User> {
    const repository = getRepository(User);

    const userExists = await repository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ApiError('User already exists!', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = repository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await repository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
