import { BcryptAdapter } from "../../config"

export const categories = [
  {
    name: 'Casa'
  },
  {
    name: 'Departamento'
  },
  {
    name: 'Bodega'
  },
  {
    name: 'Terreno'
  },
  {
    name: 'Edificio'
  },
  {
    name: 'Cabaña'
  },
  {
    name: 'Local'
  },
  {
    name: 'Oficina'
  },
  {
    name: 'Consultorio'
  },
  {
    name: 'Habitacion'
  },
  {
    name: 'Garage'
  },
]


export const prices = [
  {
      nombre: '$0 - $10,000 USD',
  },
  {
      nombre: '$10,000 - $30,000 USD',
  },
  {
      nombre: '$30,000 - $50,000 USD',
  },
  {
      nombre: '$50,000 - $75,000 USD',
  },
  {
      nombre: '$75,000 - $100,000 USD',
  },
  {
      nombre: '$100,000 - $150,000 USD',
  },
  {
      nombre: '$150,000 - $200,000 USD',
  },
  {
      nombre: '$200,000 - $300,000 USD',
  },
  {
      nombre: '$300,000 - $500,000 USD',
  },
  {
      nombre: '$500,000 USD +',
  }
]

export const users = [
  {
    name: 'Juan',
    email: 'diegogaraycullas@gmail.com',
    confirm: true,
    password: BcryptAdapter.hash('123456'),

  }
]
