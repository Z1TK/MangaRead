import { Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorator/auth.decorator';
import { Authorized } from './decorator/authorized.decorator';
import { UserEntity } from './entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Res({passthrough: true}) res: Response, @Body() dto: RegisterDto) {
    return await this.authService.register(res, dto);
  }

  @Post('login')
  async login(@Res({passthrough: true}) res: Response, @Body() dto: LoginDto) {
    return await this.authService.login(res, dto);
  }

  @Post('refresh')
  async reаresh_token(
    @Req() req: Request, 
    @Res({passthrough: true}) res: Response
  ) {
    return await this.authService.refresh(req, res);
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) res: Response) {
    return await this.authService.logout(res);
  }
  
  @Authorization()
  @Get('me')
  async me(@Authorized() user: UserEntity) {
    return user;
  }
}
