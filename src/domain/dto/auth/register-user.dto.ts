import { error } from "console";
import { regularExps } from "../../../config/regular-exp";





export class RegisterUserDto {
  //private contructor solo se puede llamar dentro de un metodo estatico
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) { }

  static create(object: { [key: string]: any }): [string[]?, RegisterUserDto?] {
    const { name, email, password, confirmPassword } = object;

    const errors: string[] = [];

    if (!email) errors.push('Missing email');
    if (!name) errors.push('Missing name');
    //evalua que sea un correo valido
    if (email && !regularExps.email.test(email)) errors.push('Invalid email');
    if (!password) errors.push('Missing password');
    if (password && password.length < 6) errors.push('Password must be at least 6 characters');
    if (!confirmPassword) errors.push('Missing confirm password');
    if (password !== confirmPassword) errors.push('Passwords do not match');

    if (errors.length > 0) return [errors];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
