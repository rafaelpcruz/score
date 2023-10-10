import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthsDocument = Auths & Document;

@Schema()
export class Auths {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  token: string;

  @Prop({ type: String })
  access_token: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accounts',
    required: true,
  })
  accountId: string;

  @Prop()
  accessRules: string[];

  @Prop({
    type: Date,
    default: Date.now,
    timestamps: true,
  })
  updatedAt: Date;

  @Prop({
    type: Date,
    default: Date.now() + 3600 * 1000 * 24,
    timestamps: true,
  })
  expires: Date;
}

export const AuthsSchema = SchemaFactory.createForClass(Auths);
