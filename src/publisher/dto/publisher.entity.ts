import { IsEmpty, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class PublisherDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    another_name: string;

    @IsString()
    @IsOptional()
    description: string;

    // change for production
    @IsUrl()
    @IsOptional()
    image: string;

}