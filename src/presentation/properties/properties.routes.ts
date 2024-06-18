import { Request, Response, Router } from "express";
import { PropertiesService } from "./properties.service";
import { PropertiesController } from "./properties.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/file-upload.middleware";


export class PropertiesRoutes {
  static get routes(): Router {
    const router = Router();

    const propertiesService = new PropertiesService()
    const controller = new PropertiesController(propertiesService)

    router.get('/my-properties', [AuthMiddleware.validateJWT], controller.adminView)
    router.get('/create', [AuthMiddleware.validateJWT], controller.createForm)
    router.post('/create', [AuthMiddleware.validateJWT], controller.create)
    router.get('/add-image/:id', [AuthMiddleware.validateJWT], controller.addImageForm)
    router.post('/add-image/:id', [AuthMiddleware.validateJWT, upload.single('image')]);


    return router;
  }
}
