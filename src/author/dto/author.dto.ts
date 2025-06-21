import { IsEmpty, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class AuthorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    pseudonym: string;

    @IsString()
    @IsOptional()
    description: string;

    // change for production
    @IsUrl()
    @IsOptional()
    image: string;

}