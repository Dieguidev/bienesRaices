

import { Request, Response } from "express"
import { CustomError, RegisterUserDto, EmailForResetPasswordUserDto } from '../../domain';
import { AuthService } from "./auth.service";
import { ResetPasswordDto } from "../../domain/dto/auth/reset-password.dto";


export class AuthController {

  // DI
  constructor(
    public readonly authService: AuthService
  ) { }


  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log(`${error}`);

    return res.status(500).json({ error: 'Internal Server Error' })
  }


  formLogin = (req: Request, res: Response) => {
    res.render('auth/login', {
      page: 'Iniciar Sesión'
    })
  }

  formRegister = (req: Request, res: Response) => {
    res.render('auth/register', {
      page: 'Crear cuenta',
      csrfToken: req.csrfToken()
    })
  }

  registerUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)
    if (error) {
      return res.render('auth/register', {
        page: 'Crear cuenta',
        csrfToken: req.csrfToken(),
        errores: error,
        user: {
          name: req.body.name,
          email: req.body.email,
        }
      })
    }

    this.authService.registerUser(registerUserDto!)
      .then((user) => {
        return res.render('templates/message', {
          page: 'Cuenta creada',
          message: 'Hemos enviado un correo de verificación a tu cuenta de correo'
        })
      })
      .catch(error => {
        // this.handleError(error, res)
        return res.render('auth/register', {
          page: 'Crear cuenta',
          csrfToken: req.csrfToken(),
          errores: [error.message],
          user: {
            name: req.body.name,
            email: req.body.email,
          }
        })
      });
  }


  forgotMyPasswordForm = (req: Request, res: Response) => {
    res.render('auth/forgot-password', {
      page: 'Recuperar cuenta',
      csrfToken: req.csrfToken(),
    })
  }

  resetPassword = (req: Request, res: Response) => {
    const [error, emailForResetPasswordUserDto] = EmailForResetPasswordUserDto.create(req.body)
    if (error) {
      return res.render('auth/forgot-password', {
        page: 'Recuperar cuenta',
        csrfToken: req.csrfToken(),
        errores: error,
      })
    }

    this.authService.resetPassword(emailForResetPasswordUserDto!)
      .then(() => res.render('templates/message', {
        page: 'Reestablece tu Password',
        message: 'Hemos Enviado un Email con las instrucciones',
        csrfToken: req.csrfToken(),
      }))
      .catch((error) => res.render('auth/forgot-password', {
        page: 'Error al restablecer el password',
        csrfToken: req.csrfToken(),
        errores: [error.message],
      }));
  }

  validateToken = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authService.validateToken(token)
      .then(() => res.render('auth/reset-password', {
        page: 'Restablece Tu Password',
        csrfToken: req.csrfToken(),
        token,
      }))
      .catch((error) => {
        return res.render('auth/confirm-acount', {
          page: 'Reestablece tu password',
          message: [error.message],
          error: true,
        })
      });
  }

  updatePassword = (req: Request, res: Response) => {
    const [error, resetPasswordDto] = ResetPasswordDto.create(req.body)
    if (error) {
      return res.render('auth/reset-password', {
        page: 'Reestablece tu password',
        csrfToken: req.csrfToken(),
        errores: error,
      })
    }

    const { token } = req.params;

    this.authService.updatePassword(resetPasswordDto!, token)
      .then(() => res.render('auth/confirm-acount', {
        page: 'Password Actualizado',
        message: 'Password actualizado correctamente',
      }))
      .catch((error) => res.render('auth/reset-password', {
        page: '',
        csrfToken: req.csrfToken(),
        errores: [error.message],
      }));
  }


  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authService.validateEmail(token)
      .then(() => res.render('auth/confirm-acount', {
        page: 'Cuenta creada correctamente',
        message: 'La cuenta se confirmó correctamente',
      }))
      .catch((error) => res.render('auth/confirm-acount', {
        page: 'Error al confirmar tu cuenta',
        message: 'Hubo un error al confirmar tu cuenta, por favor intentalo de nuevo mas tarde',
        error: true
      }));
  }
}

// export class AuthController {
//   constructor(
//     private readonly authRepository: AuthRepository,
//   ) { }




//   private handleError = (error: unknown, res: Response) => {
//     if (error instanceof CustomError) {
//       return res.status(error.statusCode).json({ error: error.message })
//     }

//     console.log(`${error}`);

//     return res.status(500).json({ error: 'Internal Server Error' })
//   }


//   registerUser = (req: Request, res: Response) => {
//     const [error, registerUserDto] = RegisterUserDto.create(req.body)
//     if (error) return res.status(400).json({ error })

//     new RegisterUser(this.authRepository)
//       .execute(registerUserDto!)
//       .then(user => res.json(user))
//       .catch(error => this.handleError(error, res));
//   }


//   loginUser = (req: Request, res: Response) => {
//     const [error, loginUserDto] = LoginUserDto.create(req.body)
//     if (error) return res.status(400).json({ error })

//     new LoginUser(this.authRepository)
//       .execute(loginUserDto!)
//       .then(user => res.json(user))
//       .catch(error => this.handleError(error, res));
//   }


// updateUser = (req: Request, res: Response) => {
//   const [error, updateUserDto] = UpdateUserDto.create(req.body)
//   if (error) return res.status(400).json({ error })

//   console.log(updateUserDto);

//   new UpdateUser(this.authRepository)
//     .execute(updateUserDto!)
//     .then(user => res.json(user))
//     .catch(error => this.handleError(error, res));
// }


// deleteUser = (req: Request, res: Response) => {
//   const { id } = req.params
//   const [error, getAndDeleteUserDto] = GetAndDeleteUserDto.create({ id })
//   if (error) return res.status(400).json({ error })

//   new DeleteUser(this.authRepository)
//     .execute(getAndDeleteUserDto!)
//     .then(user => res.json(user))
//     .catch(error => this.handleError(error, res));
// }

// getUsers = (req: Request, res: Response) => {
//   UserModel.find()
//     .then(users => res.json({
//       user: req.body.user
//     }))
//     .catch(error => this.handleError(error, res))
// }
// }
