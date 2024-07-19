import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateDtoUser{
    
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener letras mayúsculas, minúsculas y números'
    })
    password: string;

    @IsString()
    @MinLength(1)
    nombre_completo: string
}