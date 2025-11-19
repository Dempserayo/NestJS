import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// DTO significa Data Transfer Object (Objeto de Transferencia de Datos).
// Es una clase que define cómo debe ser la estructura de los datos que entran o salen en tu aplicación, por ejemplo, los datos que recibes en un POST, PUT, etc.

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
