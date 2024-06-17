import { Router } from "express";
import { PropertiesService } from "./properties.service";
import { PropertiesController } from "./properties.controller";


export class PropertiesRoutes {
  static get routes(): Router {
    const router = Router();

    const propertiesService = new PropertiesService()
    const controller = new PropertiesController(propertiesService)

    router.get('/my-properties', controller.adminView)
    router.get('/create', controller.createForm)
    router.post('/create', controller.create)

    return router;
  }
}
