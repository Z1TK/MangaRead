import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Max } from "class-validator";
import { ReleaseFormat, StatusManga, TypeManga } from "../enum/manga.enum";

export class MangaDto {
    @IsString()
    @IsNotEmpty()
    cover: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString({each: true})
    @IsOptional()
    @IsArray()
    alternative_title: string[];

    @IsString()
    @IsNotEmpty()
    author_id: string;

    @IsString()
    @IsNotEmpty()
    publisher_id: string;

    @IsEnum(TypeManga)
    @IsNotEmpty()
    type: TypeManga;

    @IsEnum(StatusManga)
    @IsNotEmpty()
    status: StatusManga;

    @IsArray()
    @IsNotEmpty()
    @IsInt({each: true})
    genres_ids: number[];

    @IsArray()
    @IsNotEmpty()
    @IsInt({each: true})
    tags_ids: number[];

    @IsArray()
    @IsNotEmpty()
    @IsEnum(ReleaseFormat, {each: true})
    release_format: ReleaseFormat[];

    @IsInt()
    @Max(new Date().getFullYear())
    release_year: number;
}