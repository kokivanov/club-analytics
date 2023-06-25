import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Validate, ValidateIf } from "class-validator"
import { isNotNullorEmpty } from "src/@common/validators/isNotNullOrEmpty"

export class patchUserDto {
    @IsOptional()
    @IsString()
    username? : string
    @IsOptional()
    @IsStrongPassword()
    password? : string
    @IsOptional()
    @IsEmail()
    email? : string

    @ValidateIf((o : patchUserDto) => !isNotNullorEmpty(o.email, o.password, o.username))
    @IsNotEmpty({ message: "Must provide atleast one option" })
    atleastOne: boolean
}