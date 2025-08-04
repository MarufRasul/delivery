import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // отключаем игнор срока действия
      secretOrKey: configService.get<string>('JWT_SECRET'), // берем секрет из .env
    });
  }

  async validate(payload: { id: string }) {
    // Этот метод вызывается, если токен валиден
    return { id: payload.id };
  }
}
