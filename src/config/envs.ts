import 'dotenv/config'
import {get} from 'env-var'


export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MYSQL_DB: get('MYSQL_DB').required().asString(),
  MYSQL_HOST: get('MYSQL_HOST').required().asString(),
  MYSQL_USER: get('MYSQL_USER').required().asString(),
  MYSQL_PASSWORD: get('MYSQL_PASSWORD').required().asString(),
  MYSQL_PORT: get('MYSQL_PORT').required().asPortNumber(),
}
