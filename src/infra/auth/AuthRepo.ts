import { IAuthRepo } from './shared/IAuthRepo';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auths, AuthsDocument } from './schemas/auths.schema';
import { Model, Types } from 'mongoose';
import { randomUUID } from 'crypto';
import { NotFoundError } from '../../aplication/exceptions/NotFoundError';

@Injectable()
export class AuthRepo implements IAuthRepo {
  constructor(
    @InjectModel(Auths.name)
    private authModel: Model<AuthsDocument>,
  ) {}
  async basicAuth(user: string, password: string): Promise<any> {
    return this.authModel.findOne({ username: user, password: password, type: 'basic' }).exec();
  }

  async oAuth(user: string, password: string): Promise<Auths> {
    return await this.authModel.findOne({ username: user, password: password, type: 'oauth' }).exec();
  }

  async setUuid(auths: Auths): Promise<Auths> {
    const customUuid = randomUUID();
    await this.authModel.updateOne({ _id: auths._id }, { access_token: customUuid + '' }, { new: true });
    return await this.authModel.findOne({ _id: auths._id }).exec();
  }

  async getUserByToken(token: string) {
    return await this.authModel.findOne({ access_token: token });
  }

  async findByAccountId(accountId: string): Promise<Auths> {
    const auth = this.authModel.findOne({ accountId: new Types.ObjectId(accountId) }).exec();

    if (!auth) {
      throw new NotFoundError('Auth data not found');
    }

    return auth;
  }
}
