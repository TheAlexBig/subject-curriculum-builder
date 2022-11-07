import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TermSchema, Term } from './curriculum.model.subject';

export type CurriculumDocument = Curriculum & Document;

@Schema()
export class Curriculum {
  @Prop()
  name: string;

  @Prop({ type: [TermSchema], default: [] })
  subjects: Array<Term>;
}

export const CurriculumSchema = SchemaFactory.createForClass(Curriculum);
