import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from '../../common/strategys/auth-basic.strategy';
import { AuthApplication } from '../../aplication/auth/AuthApplication';
import { AuthDomain } from '../../domain/auth/AuthDomain';
import { AuthRepo } from '../../infra/auth/AuthRepo';
import { OauthStrategy } from '../../common/strategys/auth-oauth.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Auths, AuthsSchema } from '../../infra/auth/schemas/auths.schema';
import { Accounts, AccountsSchema } from '../../infra/account/schemas/accounts.schema';
import { AccountRepo } from '../../infra/account/AccountRepo';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    MongooseModule.forFeature([
      { name: Auths.name, schema: AuthsSchema },
      { name: Accounts.name, schema: AccountsSchema },
    ]),
  ],
  providers: [
    BasicStrategy,
    OauthStrategy,
    { provide: 'IAuthApplication', useClass: AuthApplication },
    { provide: 'IAuthDomain', useClass: AuthDomain },
    { provide: 'IOauthRepo', useClass: AuthRepo },
    { provide: 'IAccountRepo', useClass: AccountRepo },
  ],
  exports: ['IAccountRepo', 'IOauthRepo'],
})
export class AuthModule {}