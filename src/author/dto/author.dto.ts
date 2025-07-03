import { IsEmpty, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class AuthorDto {
    @IsString({message: 'The name must be string'})
    @IsNotEmpty({message: 'The name must not be empty'})
    name: string;

    @IsString({message: 'The pseudonym must be string'})
    @IsOptional()
    pseudonym: string;

    @IsString({message: 'The description must be string'})
    @IsOptional()
    description: string;

    // change for production
    @IsUrl()
    @IsOptional()
    image: string;
}