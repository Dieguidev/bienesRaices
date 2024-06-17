import { regularExps } from "../../../config/regular-exp";

export class CreatePropertyDto {
  //private contructor solo se puede llamar dentro de un metodo estatico
  private constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly category: string,
    public readonly price: string,
    public readonly bedrooms: number,
    public readonly parking: number,
    public readonly wc: number,
    public readonly lat: string,
    public readonly lng: string,
    public readonly street: string
  ) { }

  static create(object: { [key: string]: any }): [string[]?, CreatePropertyDto?] {
    const { title, description, category, price, bedrooms, parking, wc, lat, lng, street } = object;

    const errors: string[] = [];

    if (!description) errors.push('Se necesita una descripción');
    if (description && description.length > 200) errors.push('La descripción no puede tener más de 200 caracteres');
    if (!title) errors.push('El título no puede ir vacío');
    if (!category) errors.push('Selecciona la Categoria');
    if (category && !regularExps.uuid.test(category)) errors.push('Categoria Inválida');
    if (!price) errors.push('Selecciona un rango de precio');
    if (price && !regularExps.uuid.test(price)) errors.push('Precio inválido');
    if (!bedrooms) errors.push('Selecciona la cantidad de Habitaciones');
    if (bedrooms && !Number.isInteger(Number(bedrooms))) errors.push('Habitaciones invalidas');
    if (!parking) errors.push('Selecciona la cantidad de estacionamientos');
    if (parking && !Number.isInteger(Number(parking))) errors.push('Estacionamientos inválidos');
    if (!wc) errors.push('Selecciona la cantidad de baños');
    if (wc && !Number.isInteger(Number(wc))) errors.push('Baños inválidos');
    if (!lat) errors.push('Ubica la Propiedad en el Mapa');


    if (errors.length > 0) return [errors];

    return [undefined, new CreatePropertyDto(title, description, category, price, Number(bedrooms), Number(parking), Number(wc), lat, lng, street)];
  }
}
