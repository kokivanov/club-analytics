import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class loginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsStrongPassword()
    password: string
}