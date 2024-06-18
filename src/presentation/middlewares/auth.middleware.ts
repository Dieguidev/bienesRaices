import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { prisma } from "../../data";





export class AuthMiddleware {

  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const { _token } = req.cookies;
    if (!_token) {
      return res.redirect('/api/auth/login')
    }

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(_token);

      if (!payload) return res.clearCookie('_token').redirect('/api/auth/login')

      const user = await prisma.user.findUnique({
        where: {
          id: payload?.id
        },
        select: {
          id: true,
          name: true,
          email: true,

        }
      });
      if (!user) return res.clearCookie('_token').redirect('/api/auth/login')

      // //todo: validar si el usuario esta activo

      req.body.user = user;
      next();

    } catch (error) {
      return res.clearCookie('_token').redirect('/api/auth/login')
    }
  }
}
