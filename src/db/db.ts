import { Sequelize } from 'sequelize'
import { envs } from '../config'

export const db = new Sequelize(envs.MYSQL_DB, envs.MYSQL_USER, envs.MYSQL_PASSWORD,{
  host: envs.MYSQL_HOST,
  port: envs.MYSQL_PORT,
  dialect: 'mysql',
  define: {
    timestamps: true
  },
  pool: {
    max: 5,   // Número máximo de conexiones en el pool
    min: 0,    // Número mínimo de conexiones en el pool
    acquire: 30000,   // Tiempo máximo, en milisegundos, que el pool intentará obtener una conexión antes de lanzar un error
    idle: 10000  // Tiempo máximo, en milisegundos, que una conexión puede permanecer inactiva antes de ser liberada
  }
})
