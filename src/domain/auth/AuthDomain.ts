import { IAuthDomain } from './shared/IAuthDomain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthDomain implements IAuthDomain {
  private key = '6]gl7Iz##[KeCfdj&VQjl|q:_ZXFT%OS';

  async encrypt(password) {
    const Rijndael = require('rijndael-js');
    const rijndael = new Rijndael(this.key, 'ecb');
    const iv = 'zgGkpCNKqLJeiPDON7g7OKZJ+5m/aNfgSSa4EuTgVyo=';

    const ciphertext = Buffer.from(rijndael.encrypt(password, 256, iv));
    return ciphertext.toString('base64');
  }

  async validateLogedUser(user: any): Promise<boolean> {
    if (typeof user == 'undefined') {
      return false;
    }
    return true;
  }

  generateBasicAuthToken(location: any) {
    location.basicAuthToken = Buffer.from(`${location.UsuarioDistribuidor}:${location.SenhaDistribuidor}`).toString(
      'base64',
    );

    return location;
  }
}
