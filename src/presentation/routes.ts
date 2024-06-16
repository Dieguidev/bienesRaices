import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { PropertiesRoutes } from "./properties/properties.routes";



export class AppRoutes {


  static get routes():Router {
    const router = Router();
    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/properties', PropertiesRoutes.routes)
    return router;
  }
}
