import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interface/jwt.interface';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { isDev } from 'utils/is-dev.utils';
import { timeToMilliseconds } from 'utils/time.utils';

@Injectable()
export class AuthService {
    private readonly JWT_ACCESS_TOKEN_TTL: string;
    private readonly JWT_REFRESH_TOKEN: string;

    private readonly COOKIE_DOMAIN: string;

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {
        this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');

        this.JWT_REFRESH_TOKEN = configService.getOrThrow<string>('JWT_REFRESH_TOKEN');

        this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
    }

    async register(res: Response, dto: RegisterDto){
        const { name, email, password} = dto;

        const exist_user = await this.userRepository.findOne({
            where: {email}
        });

        if (exist_user) {
            throw new ConflictException({
                message: 'User already exist'
            });
        }

        const user = await this.userRepository.create({
            name,
            email,
            password: await hash(password)
        })

        await this.userRepository.save(user);

        return this.auth(res, user.id);
    }

    async login(res: Response, dto: LoginDto) {
        const { email, password } = dto;

        const user = await this.userRepository.findOne({
            where: { email },
            select: {
                id: true,
                password: true
            }
        })

        if (!user) {
            throw new NotFoundException("User not found")
        }

        const isValidPassword = await verify(user.password, password);

        if (!isValidPassword) {
            throw new NotFoundException('User not found')
        }

        return this.auth(res, user.id);
    }

    private auth(res: Response, id) {
        const { accessToken, refreshToken } = this.generateToken(id);
        const ms = timeToMilliseconds(this.JWT_REFRESH_TOKEN);

        this.setCookie(res, refreshToken, new Date(Date.now() + ms));

        return { accessToken };
    }

    private generateToken(id: string) {
        const payload: JwtPayload = { id };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_ACCESS_TOKEN_TTL
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_REFRESH_TOKEN
        });

        return {
            accessToken, 
            refreshToken
        };
    }

    private setCookie(res: Response, value: string, expires: Date) {
        res.cookie('refreshToken', value, {
            httpOnly: true,
            domain: this.COOKIE_DOMAIN,
            expires,
            secure: !isDev(this.configService ),
            sameSite: isDev(this.configService)? 'none' : 'lax'
        })
    }
}
