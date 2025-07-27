import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { Authorized } from 'src/user/decorator/authorized.decorator';
import { UserEntity } from 'src/user/entity/user.entity';
import { Authorization } from 'src/user/decorator/auth.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findByMangaId(@Body() manga_id: string) {
    return await this.commentService.findByManga(manga_id);
  }

  @Get()
  @Authorization()
  async findByUserId(@Authorized() user: UserEntity) {
    return await this.commentService.findByUser(user);
  }

  @Post()
  @Authorization()
  async create_comment(
    @Authorized() user: UserEntity, 
    @Body() dto: CommentDto,
  ) {
    return await this.commentService.create(user, dto);
  }

  @Delete()
  @Authorization()
  async delete_comment(@Authorized() user: UserEntity) {
    return await this.commentService.delete(user);
  }
}
