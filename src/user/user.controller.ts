import { Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { Authorization } from './decorator/auth.decorator';
import { Authorized } from './decorator/authorized.decorator';
import { UserEntity } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Res({passthrough: true}) res: Response, @Body() dto: RegisterDto) {
    return await this.userService.register(res, dto);
  }

  @Post('login')
  async login(@Res({passthrough: true}) res: Response, @Body() dto: LoginDto) {
    return await this.userService.login(res, dto);
  }

  @Post('refresh')
  async reаresh_token(
    @Req() req: Request, 
    @Res({passthrough: true}) res: Response
  ) {
    return await this.userService.refresh(req, res);
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) res: Response) {
    return await this.userService.logout(res);
  }
  
  @Authorization()
  @Get('profile')
  async me(@Authorized() user: UserEntity) {
    return user;
  }
}