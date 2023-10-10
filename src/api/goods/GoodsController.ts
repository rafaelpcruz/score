import { Body, Controller, Delete, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { IGoodsApplication } from "../../aplication/goods/shared/IGoodsApplication";

@Controller('debts/client')

export class debtsController {
  constructor(
    @Inject('IGoodsApplication')
    private readonly goodsApplication: IGoodsApplication,
  ) {}

  @Post()
  @HttpCode(200)
  async addDebts(@Body() body: any) {
    return await this.goodsApplication.addGoods(body);;
  }

  @Get()
  @HttpCode(200)
  async getDebts(@Body() body: any) {
    return await this.goodsApplication.getGoods();;
  }

  @Delete()
  @HttpCode(200)
  async delDebts(@Body() body: any) {
    return await this.goodsApplication.delGoods();;
  }
}