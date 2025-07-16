import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(120)
    password:string;
}