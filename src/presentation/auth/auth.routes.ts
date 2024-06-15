



import { Router } from "express";
import { AuthController } from "./auth.controller";
// import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
// import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthService } from './auth.service';
import { envs } from "../../config";
import { EmailService } from "./email.service";



export class AuthRoutes {


  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL,
    );

    // const database = new AuthDatasourceImpl();
    // const authRepository = new AuthRepositoryImpl(database)

    // const controller = new AuthController(authRepository);
    const authService = new AuthService(emailService);
    const controller = new AuthController(authService);

    router.get('/login', controller.formLogin)

    router.get('/register', controller.formRegister)
    router.post('/register', controller.registerUser)

    router.get('/validate-email/:token', controller.validateEmail );

    router.get('/forgot-password', controller.forgotMyPasswordForm)
    router.post('/forgot-password', controller.resetPassword)
    router.get('/reset-password/:token', controller.validateToken)
    router.post('/reset-password/:token', controller.updatePassword)

    // router.post('/login', controller.loginUser)
    // router.post('/register', controller.registerUser)
    // router.put('/update', [AuthMiddleware.validateJWT], controller.updateUser)
    // router.delete('/:id',[AuthMiddleware.isAdminRoleOrSameUser], controller.deleteUser)

    // router.get('/', [AuthMiddleware.validateJWT], controller.getUsers)


    return router;
  }
}
