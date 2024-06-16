import { regularExps } from "../../../config/regular-exp";

export class LoginUserDto {
  //private contructor solo se puede llamar dentro de un metodo estatico
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) { }

  static create(object: { [key: string]: any }): [string[]?, LoginUserDto?] {
    const {email, password} = object;

    const errors: string[] = [];

    if (!email) errors.push('Missing email');

    //evalua que sea un correo valido
    if (email && !regularExps.email.test(email)) errors.push('Invalid email');
    if (!password) errors.push('Missing password');
    if (password && password.length < 6) errors.push('Password must be at least 6 characters');

    if (errors.length > 0) return [errors];

    return [undefined, new LoginUserDto(email, password)];
  }
}
