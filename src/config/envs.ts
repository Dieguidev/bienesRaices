import 'dotenv/config'
import { get } from 'env-var'


export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MYSQL_DB: get('MYSQL_DB').required().asString(),
  MYSQL_HOST: get('MYSQL_HOST').required().asString(),
  MYSQL_USER: get('MYSQL_USER').required().asString(),
  MYSQL_PASSWORD: get('MYSQL_PASSWORD').required().asString(),
  MYSQL_PORT: get('MYSQL_PORT').required().asPortNumber(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  SEND_EMAIL: get('SEND_EMAIL').required().asBool(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
};

