
import { Request, Response } from "express"
import { PropertiesService } from "./properties.service";

export class PropertiesController {
  constructor(
    public readonly propertiesService: PropertiesService
  ) { }

  admin = (req: Request, res: Response) => {
    res.render('properties/admin', {
      page: 'Mis propiedades',
      navbar: true
    })
  }

  create = (req: Request, res: Response) => {
    res.render('properties/create', {
      page: 'Crear Propiedad',
      navbar: true
    })
  }
}
