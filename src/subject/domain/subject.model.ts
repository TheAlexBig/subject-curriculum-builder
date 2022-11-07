import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {

  @Prop({unique: true})
  code: string;

  @Prop()
  uv: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  weight: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Subject' }] })
  prerequisite: Array<Subject>;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
