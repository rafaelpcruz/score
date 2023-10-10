import { GoodsDto } from "../dto/GoodsDto";

export interface IGoodsApplication {
    addGoods(dto: GoodsDto);
    getGoods();
    delGoods();
  }