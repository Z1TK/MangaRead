import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

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