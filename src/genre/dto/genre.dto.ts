import { IsNotEmpty, IsString } from "class-validator";

export class GenreDto {
    @IsString({message: 'The name must be string'})
    @IsNotEmpty({message: 'The name must not be empty'})
    name: string;
}