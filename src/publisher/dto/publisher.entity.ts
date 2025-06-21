import { IsEmpty, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class PublisherDto {
    @IsString({message: 'The name must be string'})
    @IsNotEmpty({message: 'The name must not be empty'})
    name: string;

    @IsString({message: 'The another name must be string'})
    @IsOptional()
    another_name: string;

    @IsString({message: 'The description must be string'})
    @IsOptional()
    description: string;

    // change for production
    @IsUrl()
    @IsOptional()
    image: string;

}