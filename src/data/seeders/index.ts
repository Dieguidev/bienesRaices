
import { prisma } from "..";
import { categories, prices, users } from "./data";



(async () => {
  await prisma.$connect();

  await main();


  await prisma.$disconnect();
})();

async function main() {

  //eliminar todo de la base de datos - warning
  await Promise.all([
    prisma.property.deleteMany(),
    prisma.category.deleteMany(),
    prisma.price.deleteMany(),
    prisma.user.deleteMany(),
  ])

  //crear roles del seed.ts
  // const roles = await prisma.role.createMany({ data: seedData.roles })


  //crear usuarios del seed.ts
  // const usersData = await Promise.all(seedData.users.map(async user => {
  //   const roleIdObj = await prisma.role.findFirst({ where: { role: user.role } });
  //   const roleId = roleIdObj?.id;
  //   if (roleId === undefined) {
  //     throw new Error(`No se pudo encontrar un roleId para el usuario ${user.name}`);
  //   }
  //   const { role, ...rest } = user;
  //   return {
  //     dni: rest.dni,
  //     email: rest.email,
  //     name: rest.name,
  //     lastName: rest.lastName,
  //     password: rest.password,
  //     address: rest.address,
  //     phone: rest.phone,
  //     province: rest.province,
  //     district: rest.district,
  //     roleId: roleId,
  //   };
  // }));

  const categoriesData = await Promise.all(categories.map(async category => {
    return {
      name: category.name,
    };
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const pricesData = await Promise.all(prices.map(async price => {
    return {
      name: price.nombre,
    };
  }))

  await prisma.price.createMany({
    data: pricesData,
  });

  const usersData = await Promise.all(users.map(async user => {
    return {
      ...user
    }
  }))

  await prisma.user.createMany({
    data: usersData,
  });


  // //crear productos del seed.ts
  // const products = await ProductModel.insertMany(
  //   seedData.products.map(product => ({
  //     ...product, user: users[randomBetween0AndX(users.length)].id,
  //     category: categories[randomBetween0AndX(categories.length)].id
  //   }))
  // )

  console.log('seed ok');

}

