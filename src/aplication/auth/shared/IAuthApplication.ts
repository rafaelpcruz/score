import { IBasicAuthDto } from '../dto/IBasicAuthDto';
import { IOAuthDto } from '../dto/IOAuthDto';

export interface IAuthApplication {
  basicAuth(dto: IBasicAuthDto): Promise<boolean>;
  validateOauth(token: string): Promise<boolean>;
  token(dto: IOAuthDto): Promise<any>;
}