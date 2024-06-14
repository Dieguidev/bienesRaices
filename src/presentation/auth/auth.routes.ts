



import { Router } from "express";
import { AuthController } from "./auth.controller";
// import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
// import { AuthMiddleware } from "../middlewares/auth.middleware";



export class AuthRoutes {


  static get routes(): Router {
    const router = Router();

    // const database = new AuthDatasourceImpl();
    // const authRepository = new AuthRepositoryImpl(database)

    // const controller = new AuthController(authRepository);
    const controller = new AuthController();

    router.get('/login', controller.formLogin)
    router.get('/register', controller.formRegister)
    router.get('/forgot-password', controller.forgotMyPasswordForm)

    // router.post('/login', controller.loginUser)
    // router.post('/register', controller.registerUser)
    // router.put('/update', [AuthMiddleware.validateJWT], controller.updateUser)
    // router.delete('/:id',[AuthMiddleware.isAdminRoleOrSameUser], controller.deleteUser)

    // router.get('/', [AuthMiddleware.validateJWT], controller.getUsers)


    return router;
  }
}
