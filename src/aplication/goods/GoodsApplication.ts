import { Inject, Injectable } from '@nestjs/common';
import {IGoodsApplication} from './shared/IGoodsApplication';
import {IAccountRepo} from '../../infra/account/shared/IAccountRepo';
import {IAuthRepo} from '../../infra/auth/shared/IAuthRepo';

@Injectable()
export class DebtsApplication implements IGoodsApplication {
  constructor(
    @Inject('IAccountRepo')
    private readonly account: IAccountRepo,
    @Inject('IOauthRepo')
    private readonly auth: IAuthRepo,
  ) {}

  async addGoods(){
    return {
        message: 'addGoods',
    };
  }

  async getGoods(){
    return {
        message: 'getGoods',
    };
  }

  async delGoods(){
    return {
        message: 'delGoods',
    };
  }
}