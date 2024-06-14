import { CustomError, RegisterUserDto } from "../../domain";



import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export class AuthService {


  async registerUser(registerUserDto: RegisterUserDto) {
    const userExits = await prisma.user.findUnique({
      where: {
        email: registerUserDto?.email
      }
    })
    if (userExits) throw CustomError.badRequest('User already exist')

    try {

      const user = await prisma.user.create({
        data: registerUserDto!
      });

      // //encriptar contraseña
      // user.password = bcryptAdapter.hash(registerUserDto.password)
      // await user.save();

      // //enviar correo de verificacion
      // await this.sendEmailValidationLink(user.email)

      // const { password, ...userEntity } = UserEntity.fromJson(user)

      // const token = await this.generateTokenService(user.id)

      return {
        user
        // token
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }

  }
}
