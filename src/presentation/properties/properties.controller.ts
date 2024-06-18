
import { Request, Response } from "express"
import { PropertiesService } from "./properties.service";
import { CreatePropertyDto } from "../../domain";

export class PropertiesController {
  constructor(
    public readonly propertiesService: PropertiesService
  ) { }

  adminView = (req: Request, res: Response) => {
    res.render('properties/admin', {
      page: 'Mis propiedades',
      navbar: true,
    })
  }

  createForm = (req: Request, res: Response) => {
    this.propertiesService.createForm()
      .then(({ categories, prices }) => {
        res.render('properties/create', {
          page: 'Crear Propiedad',
          navbar: true,
          csrfToken: req.csrfToken(),
          categories,
          prices,
          data: {}
        })
      })
  }

  create = (req: Request, res: Response) => {
    const [error, createPropertyDto] = CreatePropertyDto.create(req.body)
    if (error) {
      return this.propertiesService.createForm()
        .then(({ categories, prices }) => {
          return res.render('properties/create', {
            page: 'Crear Propiedad',
            navbar: true,
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errores: error,
            data: req.body
          })
        }).catch(err => {
          // Manejar errores al obtener categorías y precios si es necesario
          console.error(err);
          return res.status(500).send('Server error');
        });
    }
    this.propertiesService.create(createPropertyDto!, req.body.user.id)
      .then((property) => {
        res.redirect(`api/properties/add-image/${property.id}`)
      })
  }
}
