import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  companyId: Types.ObjectId; // 🔥 collegamento all'utente azienda

  @Prop({ default: true })
  active: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);
