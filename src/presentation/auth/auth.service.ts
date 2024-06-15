import { BcryptAdapter, envs } from "../../config";
import { JwtAdapter } from "../../config/jwt";

import { CustomError, RegisterUserDto, EmailForResetPasswordUserDto } from "../../domain";



import { PrismaClient } from "@prisma/client";
import { EmailService } from "./email.service";
import { ResetPasswordDto } from "../../domain/dto/auth/reset-password.dto";


const prisma = new PrismaClient();
export class AuthService {

  constructor(
    //DI - Servicio Email
    private readonly emailservice: EmailService,
  ) { }

  private async generateTokenService(id: string) {
    const token = await JwtAdapter.generateToken({ id })
    if (!token) {
      throw CustomError.internalServer('Error generating token')
    }
    return token
  }


  async registerUser(registerUserDto: RegisterUserDto) {
    const userExits = await prisma.user.findUnique({
      where: {
        email: registerUserDto?.email
      }
    })
    if (userExits) throw CustomError.badRequest('User already exist')

    try {
      const user = await prisma.user.create({
        data: {
          ...registerUserDto,
          password: BcryptAdapter.hash(registerUserDto.password)
        },
        select: {
          id: true,
          name: true,
          email: true,
        }
      });

      await this.sendEmailValidationLink(user.email)
      const token = await this.generateTokenService(user.id)

      return {
        user,
        token
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  async resetPassword(emailForResetPasswordUserDto: EmailForResetPasswordUserDto) {
    const { email } = emailForResetPasswordUserDto

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) throw CustomError.badRequest('User not found')

    await this.sendResetPasswordLink(user.email)

    return true;
  }

  public async validateToken(token: string) {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) {
      throw CustomError.unauthorized('Invalid token');
    }

    const { email } = payload as { email: string }
    if (!email) {
      throw CustomError.internalServer('Email not in token');
    };

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      throw CustomError.badRequest('User not found');
    };

    return true;
  }

  async updatePassword(resetPasswordDto: ResetPasswordDto, token: string) {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) {
      throw CustomError.unauthorized('Invalid token');
    }

    const { email } = payload as { email: string }
    if (!email) {
      throw CustomError.internalServer('Email not in token');
    };

    try {
      const user = await prisma.user.update({
        where: {
          email
        },
        data: {
          password: BcryptAdapter.hash(resetPasswordDto.password)
        }
      });

      await this.sendEmailValidationLink(user.email)
      const token = await this.generateTokenService(user.id)

      return {
        user,
        token
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }


  private async sendResetPasswordLink(email: string) {
    const token = await JwtAdapter.generateToken({ email })
    if (!token) {
      throw CustomError.internalServer('Error generating token')
    }
    const link = `${envs.WEBSERVICE_URL}/api/auth/reset-password/${token}`;
    const html = `
      <h1>Reset your password</h1>
      <p>Please click the following link to reset your password:</p>
      <a href="${link}">Reset Password</a>
    `;

    const options = {
      to: email,
      subject: 'Reset your password',
      html,
    }

    const isSent = await this.emailservice.sendEmail(options);
    if (!isSent) {
      throw CustomError.internalServer('Error sending email')
    }

    return true;
  }

  private async sendEmailValidationLink(email: string) {
    const token = await JwtAdapter.generateToken({ email })
    if (!token) {
      throw CustomError.internalServer('Error generating token')
    }

    const link = `${envs.WEBSERVICE_URL}/api/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Please click the following link to validate your email:</p>
      <a href="${link}">validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      html,
    }

    const isSent = await this.emailservice.sendEmail(options);
    if (!isSent) {
      throw CustomError.internalServer('Error sending email')
    }

    return true;
  }

  public async validateEmail(token: string) {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) {
      throw CustomError.unauthorized('Invalid token');
    }

    const { email } = payload as { email: string }
    if (!email) {
      throw CustomError.internalServer('Email not in token');
    };

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      throw CustomError.badRequest('User not found');
    };

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        confirm: true
      }
    })

    return true;
  }
}
