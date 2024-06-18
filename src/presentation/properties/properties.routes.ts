import { Router } from "express";
import { PropertiesService } from "./properties.service";
import { PropertiesController } from "./properties.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class PropertiesRoutes {
  static get routes(): Router {
    const router = Router();

    const propertiesService = new PropertiesService()
    const controller = new PropertiesController(propertiesService)

    router.get('/my-properties', [AuthMiddleware.validateJWT], controller.adminView)
    router.get('/create', [AuthMiddleware.validateJWT], controller.createForm)
    router.post('/create', [AuthMiddleware.validateJWT], controller.create)
    router.get('/add-image/:id', [AuthMiddleware.validateJWT], controller.addImageForm)

    return router;
  }
}
