import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurriculumController } from './curriculum.controller';
import { Curriculum, CurriculumSchema } from './domain/curriculum.model';
import { CurriculumService } from './curriculum.service';
import { SubjectService } from 'src/subject/subject.service';
import { Subject, SubjectSchema } from 'src/subject/domain/subject.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Curriculum.name, schema: CurriculumSchema },
    ]),
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }])
  ],
  controllers: [CurriculumController],
  providers: [SubjectService, CurriculumService],
})
export class CurriculumModule {}
