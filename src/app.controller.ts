import { Controller, Get } from '@nestjs/common';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('health')
export class AppController {
  @Get()
  @Unprotected()
  async health() {
    return { message: 'OK!!' };
  }
}