import { Accounts } from '../../../infra/account/schemas/accounts.schema';

export interface IOAuthResponseDto {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  authorities: string[];
  account?: Accounts;
  relatedAccounts?: Accounts[];
}
