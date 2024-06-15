import { regularExps } from "../../../config/regular-exp";





export class ResetPasswordDto {
  //private contructor solo se puede llamar dentro de un metodo estatico
  private constructor(
    public readonly password: string,
  ) { }

  static create(object: { [key: string]: any }): [string[]?, ResetPasswordDto?] {
    const {password, confirmPassword } = object;

    const errors: string[] = [];

    if (!password) errors.push('Missing password');
    if (password && password.length < 6) errors.push('Password must be at least 6 characters');
    if (!confirmPassword) errors.push('Missing confirm password');
    if (password !== confirmPassword) errors.push('Passwords do not match');

    if (errors.length > 0) return [errors];

    return [undefined, new ResetPasswordDto(password)];
  }
}
