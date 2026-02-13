
import { Router } from 'express';
import { AuthController } from './controller';
import { envs, JwtAdapter } from '../../config';
import { env } from 'process';
import { AuthService, EmailService } from '../services';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    const emailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);
    const jwtAdapter = new JwtAdapter(envs.SEED_TOKEN);
    const authService = new AuthService(emailService, jwtAdapter, envs.API_HOST);
    const controller = new AuthController(authService);
    
    // Definir las rutas
    router.post('/login', controller.login );
    router.post('/register', controller.register );
    router.get('/validate-email/:token', controller.validateEmail );



    return router;
  }


}

