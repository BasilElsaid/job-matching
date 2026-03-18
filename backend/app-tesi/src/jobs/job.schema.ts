import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobDocument = Job & Document;
export type JobStatus = 'PENDING' | 'APPROVED';

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  companyId: Types.ObjectId;

  @Prop({ default: true })
  active: boolean;

  @Prop({ required: true })
  referenceLink: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({
    enum: ['PENDING', 'APPROVED'],
    default: 'PENDING',
  })
  status: JobStatus;
}

export const JobSchema = SchemaFactory.createForClass(Job);
