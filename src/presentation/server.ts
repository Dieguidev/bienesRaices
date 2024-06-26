import { PrismaClient } from '@prisma/client';
import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'

const prisma = new PrismaClient()

interface Options {
  port?: number;
  routes: Router;
}

export class Server {

  public readonly app = express()
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3000, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {

    //middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //habilita CookieParser
    this.app.use(cookieParser())

    //Habilita CSRF
    this.app.use(csrf({cookie: true}))

    //rutas
    this.app.use(this.routes);


    try {
      // Intentar conectar
      await prisma.$connect();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    } finally {
      // Asegurarse de desconectar correctamente
      await prisma.$disconnect();
    }

    //PUG
    this.app.set('view engine', 'pug');
    this.app.set('views', './views');

    //public
    this.app.use(express.static('public'));

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })



  }
}
