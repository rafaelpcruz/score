import { Accounts } from '../schemas/accounts.schema';

export interface IAccountRepo {
  getAccount(accountId: string): Promise<any>;
}