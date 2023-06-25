import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class deleteUserDto {
    @IsNotEmpty()
    @IsStrongPassword()
    password: string
}