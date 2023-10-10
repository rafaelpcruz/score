import { Inject, Injectable } from '@nestjs/common';
import {IDebtsApplication} from './shared/IDebtsApplication';
import {IAccountRepo} from '../../infra/account/shared/IAccountRepo';
import {IAuthRepo} from '../../infra/auth/shared/IAuthRepo';

@Injectable()
export class DebtsApplication implements IDebtsApplication {
  constructor(
    @Inject('IAccountRepo')
    private readonly account: IAccountRepo,
    @Inject('IOauthRepo')
    private readonly auth: IAuthRepo,
  ) {}

  async addDebts(){
    return {
        message: 'addDebts',
    };
  }

  async getDebts(){
    return {
        message: 'getDebts',
    };
  }

  async delDebts(){
    return {
        message: 'delDebts',
    };
  }
}