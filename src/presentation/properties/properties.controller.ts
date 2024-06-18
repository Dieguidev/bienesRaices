
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
    })
  }

  createForm = (req: Request, res: Response) => {
    this.propertiesService.createForm()
      .then(({ categories, prices }) => {
        res.render('properties/create', {
          page: 'Crear Propiedad',
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

  addImageForm = (req: Request, res: Response) => {
    const { id: idProperty } = req.params;
    const { id: userId } = req.body.user;

    this.propertiesService.addImageForm(idProperty, userId)
      .then(property => {
        res.render('properties/add-image', {
          page: `Agregar Imagen: ${property.title}`,
          property,
          csrfToken: req.csrfToken(),
        })
      })
      .catch(err => {
        res.redirect('/api/properties/my-properties')
      })
  }

  addImage = (req: Request, res: Response) => {

  }
}
