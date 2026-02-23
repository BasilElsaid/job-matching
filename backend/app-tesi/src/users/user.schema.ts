import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export type UserRole = 'ADMIN' | 'COMPANY' | 'USER';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // 🔥 bcrypt hash

  @Prop({ enum: ['ADMIN', 'COMPANY', 'USER'], default: 'USER' })
  role: UserRole;

  // Solo per aziende
  @Prop()
  companyName?: string;

  @Prop()
  companyEmail?: string;

  @Prop()
  companyPhone?: string;

  @Prop()
  companyAddress?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
