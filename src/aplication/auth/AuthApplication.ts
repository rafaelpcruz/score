import { Inject, Injectable } from '@nestjs/common';
import { IAuthApplication } from './shared/IAuthApplication';
import { IAuthDomain } from '../../domain/auth/shared/IAuthDomain';
import { IBasicAuthDto } from './dto/IBasicAuthDto';
import { IAuthRepo } from '../../infra/auth/shared/IAuthRepo';
import { IOAuthDto } from './dto/IOAuthDto';
import { IOAuthResponseDto } from './dto/IOAuthResponseDto';
import { randomUUID } from 'crypto';
import { IAccountRepo } from '../../infra/account/shared/IAccountRepo';
import { HttpError } from '../exceptions/HttpError';

@Injectable()
export class AuthApplication implements IAuthApplication {
  constructor(
    @Inject('IAuthDomain')
    private readonly domain: IAuthDomain,

    @Inject('IOauthRepo')
    private readonly auth: IAuthRepo,
    @Inject('IAccountRepo')
    private readonly account: IAccountRepo,
  ) {}

  async basicAuth(dto: IBasicAuthDto): Promise<any> {
    const encryptedPass = await this.domain.encrypt(dto.password);
    const auth = await this.auth.basicAuth(dto.user, encryptedPass.toString());

    if (!auth) {
      throw new HttpError('Não autorizado', 401);
    }

    const account = await this.account.getAccount(auth.accountId);

    return {
      account: account,
      basicAuthToken: await AuthApplication.generateToken(dto.user, dto.password),
      auth: auth,
    };
  }

  private static async generateToken(username: string, password: string) {
    return Buffer.from(`${username}:${password}`).toString('base64');
  }

  async validateOauth(token: string): Promise<any> {
    const oauthToken = await this.auth.getUserByToken(token);
    const account = await this.account.getAccount(oauthToken.accountId);
    return {
      access_token: oauthToken.access_token,
      token_type: 'bearer',
      refresh_token: '',
      expires_in: oauthToken.expires.getTime(),
      scope: 'read write',
      authorities: oauthToken.accessRules,
      account: account,
    };
  }

  async token(dto: IOAuthDto): Promise<IOAuthResponseDto> {
    const encryptedPass = await this.domain.encrypt(dto.password);
    let apiUsuario = await this.auth.oAuth(dto.username, encryptedPass);
    apiUsuario = await this.auth.setUuid(apiUsuario);
    return {
      access_token: apiUsuario.access_token,
      token_type: 'bearer',
      refresh_token: randomUUID(),
      expires_in: apiUsuario.expires.getTime(),
      scope: 'read write',
      authorities: apiUsuario.accessRules,
    };
  }
}
