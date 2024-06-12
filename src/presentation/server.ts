import express, { Router } from 'express'

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

    //rutas
    this.app.use(this.routes);

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
