import { IAccountRepo } from './shared/IAccountRepo';
import { InjectModel } from '@nestjs/mongoose';
import { Accounts, AccountsDocument } from './schemas/accounts.schema';
import { Model } from 'mongoose';
import { NotFoundError } from '../../aplication/exceptions/NotFoundError';

export class AccountRepo implements IAccountRepo {
  constructor(
    @InjectModel(Accounts.name)
    private account: Model<AccountsDocument>,
  ) {}

  async getAccount(accountId: string): Promise<Accounts> {
    const account = await this.account.findById(accountId).exec();

    if (!account) {
      throw new NotFoundError('Account not found');
    }

    return account;
  }

}
