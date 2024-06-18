import { prisma } from "../../data";
import { CreatePropertyDto, CustomError } from "../../domain";



export class PropertiesService {
  async createForm() {
    const [categories, prices] = await Promise.all([
      prisma.category.findMany(),
      prisma.price.findMany()
    ])

    function getMinValueFromName(name: string) {
      const matches = name.match(/\d+/g);
      return matches ? parseInt(matches[0], 10) : 0;
    }

    const sortedPrices = prices.sort((a, b) => {
      return getMinValueFromName(a.name) - getMinValueFromName(b.name);
    });
    return {
      categories,
      prices: sortedPrices
    }
  }

  async create(createPropertyDto: CreatePropertyDto, userId: string) {
    const { wc: bathroom, category: categoryId, price: priceId,  ...rest } = createPropertyDto;
    try {
      const property = await prisma.property.create({
        data: {
          ...rest,
          bathroom,
          img: '',
          categoryId,
          priceId,
          userId
        }
      })

      return property;

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
