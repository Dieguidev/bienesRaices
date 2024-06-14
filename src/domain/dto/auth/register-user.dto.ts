import { regularExps } from "../../../config/regular-exp";





export class RegisterUserDto {
  //private contructor solo se puede llamar dentro de un metodo estatico
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, confirmPassword } = object;



    if (!email) return ['Missing email'];
    if (!name) return ['Missing nameee'];
    //evalua que sea un correo valido
    if (!regularExps.email.test(email)) return ['Invalid email'];
    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password must be at least 6 characters'];
    if (!confirmPassword) return ['Missing confirm password'];
    if (confirmPassword.length < 6) return ['Password must be at least 6 characters'];

    if (password !== confirmPassword) return ['Passwords do not match'];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
