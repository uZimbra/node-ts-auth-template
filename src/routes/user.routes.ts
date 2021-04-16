import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import CreateUserService from '../services/user/CreateUserService';
import DeleteUserService from '../services/user/DeleteUserService';
import ListUserService from '../services/user/ListUserService';
import UpdateUserService from '../services/user/UpdateUserService';

const userRouter = Router();

userRouter.post('/users', async (request, response) => {
  const { name, email, password, role } = request.body;

  const userService = new CreateUserService();

  const user = await userService.execute({ name, email, password, role });

  return response.json(user);
});

userRouter.put('/users/:userId', authMiddleware, async (request, response) => {
  const authenticatedUserId = request.userId;
  const { userId } = request.params;
  const { name, email, password, role } = request.body;

  const userService = new UpdateUserService();

  const user = await userService.execute({
    authenticatedUserId,
    userId,
    name,
    email,
    password,
    role,
  });

  return response.json(user);
});

userRouter.get('/users/:userId', authMiddleware, async (request, response) => {
  const authenticatedUserId = request.userId;
  const { userId } = request.params;

  const userService = new ListUserService();

  const user = await userService.execute({ authenticatedUserId, userId });

  return response.json(user);
});

userRouter.delete(
  '/users/:userId',
  authMiddleware,
  async (request, response) => {
    const authenticatedUserId = request.userId;

    const { userId } = request.params;

    const userService = new DeleteUserService();

    await userService.execute({ authenticatedUserId, userId });

    return response.status(200).json();
  },
);

export default userRouter;
