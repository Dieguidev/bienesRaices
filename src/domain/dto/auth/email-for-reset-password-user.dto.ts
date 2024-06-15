import { error } from "console";
import { regularExps } from "../../../config/regular-exp";





export class EmailForResetPasswordUserDto {
  //private contructor solo se puede llamar dentro de un metodo estatico
  private constructor(
    public readonly email: string,
  ) { }

  static create(object: { [key: string]: any }): [string[]?, EmailForResetPasswordUserDto?] {
    const { name, email, password, confirmPassword } = object;

    const errors: string[] = [];

    if (!email) errors.push('Missing email');

    //evalua que sea un correo valido
    if (email && !regularExps.email.test(email)) errors.push('Invalid email');

    if (errors.length > 0) return [errors];

    return [undefined, new EmailForResetPasswordUserDto(email)];
  }
}
