import { Strategy } from 'passport-http-bearer';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthApplication } from '../../aplication/auth/shared/IAuthApplication';

@Injectable()
export class OauthStrategy extends PassportStrategy(Strategy, 'oauth') {
  constructor(
    @Inject('IAuthApplication')
    private readonly authApplication: IAuthApplication,
  ) {
    super();
  }

  public validate = async (token: string): Promise<any> => {
    return await this.authApplication.validateOauth(token);
  };
}
