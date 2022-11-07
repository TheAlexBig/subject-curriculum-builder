import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Subject } from "src/subject/domain/subject.model";

export type TermDocument = Term & Document;

@Schema()
export class Term {
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Subject' }], required: true })
    subject: Subject;
    @Prop({ required: true })
    display: string;
    @Prop({ required: true })
    index: number;
  }
  
  export const TermSchema = SchemaFactory.createForClass(Term);