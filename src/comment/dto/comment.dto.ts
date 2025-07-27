import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CommentDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(1024)
    content: string;

    @IsString()
    @IsNotEmpty()
    manga_id: string;
}