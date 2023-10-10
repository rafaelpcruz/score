import { BasicStrategy as Strategy } from 'passport-http';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthApplication } from '../../aplication/auth/shared/IAuthApplication';
import { HttpError } from '../../aplication/exceptions/HttpError';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('IAuthApplication')
    private readonly authApplication: IAuthApplication,
  ) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, username, password): Promise<boolean> => {
    const user = await this.authApplication.basicAuth({
      user: username,
      password: password,
    });

    if (!user) {
      throw new HttpError('Não autorizado', 401);
    }
    return user;
  };
}
