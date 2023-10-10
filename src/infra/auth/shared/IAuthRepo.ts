import { Auths } from '../schemas/auths.schema';

export interface IAuthRepo {
  basicAuth(user: string, password: string): Promise<any>;
  oAuth(user: string, password: string): Promise<Auths>;
  setUuid(auths: Auths): Promise<Auths>;
  getUserByToken(token: string): Promise<Auths>;
  findByAccountId(accountId: string): Promise<Auths>;
}
