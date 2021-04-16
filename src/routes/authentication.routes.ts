import { Router } from 'express';
import CreateAuthenticationService from '../services/authentication/CreateAuthenticationService';

const authenticationRouter = Router();

authenticationRouter.post('/authenticate', async (request, response) => {
  const { email, password } = request.body;

  const authService = new CreateAuthenticationService();

  const auth = await authService.execute({ email, password });

  return response.json(auth);
});

export default authenticationRouter;
