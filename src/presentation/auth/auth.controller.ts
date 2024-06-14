

import { Request, Response } from "express"
import { CustomError, RegisterUserDto } from '../../domain';
import { AuthService } from "./auth.service";


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
      page: 'Crear cuenta'
    })
  }

  registerUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

      this.authService.registerUser(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  }


  forgotMyPasswordForm = (req: Request, res: Response) => {
    res.render('auth/forgot-password', {
      page: 'Recuperar cuenta'
    })
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
