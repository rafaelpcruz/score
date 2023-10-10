import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AccountsDocument = Accounts & Document;

@Schema({ collection: 'accounts' })
export class Accounts {
  _id: string;

  @Prop({ required: true })
  accountType: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({ required: true })
  name: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AccountsSchema = SchemaFactory.createForClass(Accounts);
