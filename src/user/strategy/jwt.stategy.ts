import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { UserService } from "../user.service";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../interface/jwt.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpireBearer: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
            algorithms: ['HS256']
        });
    }

    async validate(paylod: JwtPayload) {
        return await this.userService.validate(paylod.id);
    }
}