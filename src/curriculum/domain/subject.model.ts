import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Subject } from '../../subject/domain/subject.model';

export type CurriculumDocument = Curriculum & Document;

@Schema()
export class Curriculum {
  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Subject' }] })
  subjects: Subject[];
}

export const CurriculumSchema = SchemaFactory.createForClass(Curriculum);
