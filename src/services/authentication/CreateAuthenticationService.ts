import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authSecret from '../../config/authSecret';
import ApiError from '../../errors/ApiError';
import User from '../../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  jwt: string;
}

class CreateAuthenticationService {
  async execute({ email, password }: Request): Promise<Response> {
    const repository = getRepository(User);

    const user = await repository.findOne({
      where: { email },
    });

    if (!user) {
      throw new ApiError('Invalid user!', 403);
    }

    const passwordMatch = await compare(password, user.password || '');

    if (!passwordMatch) {
      throw new ApiError('Invalid or marlformated request', 403);
    }

    const jwt = sign({ id: user.userId }, authSecret.secret, {
      expiresIn: '1d',
    });

    delete user.password;

    return {
      user,
      jwt,
    };
  }
}

export default CreateAuthenticationService;
