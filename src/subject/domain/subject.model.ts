import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Term } from './subject.term.dto';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
  @Prop()
  term: Term;

  @Prop()
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
  prerequisite: Subject[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
