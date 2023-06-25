import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class registerDto {
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsStrongPassword()
    password: string
    @IsNotEmpty()
    @IsString()
    username: string
}