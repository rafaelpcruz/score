import { DebtsDto } from "../dto/DebtsDto";

export interface IDebtsApplication {
    addDebts(dto: DebtsDto);
    getDebts();
    delDebts();
  }