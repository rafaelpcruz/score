import { Body, Controller, Delete, Get, HttpCode, Inject, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { IDebtsApplication } from "../../aplication/debts/shared/IDebtsApplication";

@Controller('debts/client')

export class debtsController {
  constructor(
    @Inject('IDebtsApplication')
    private readonly debtsApplication: IDebtsApplication,
  ) {}

  @Post()
  @HttpCode(200)
  async addDebts(@Body() body: any) {
    return await this.debtsApplication.addDebts(body);;
  }

  @Get()
  @HttpCode(200)
  async getDebts(@Body() body: any) {
    return await this.debtsApplication.getDebts();;
  }

  @Delete()
  @HttpCode(200)
  async delDebts(@Body() body: any) {
    return await this.debtsApplication.delDebts();;
  }
}