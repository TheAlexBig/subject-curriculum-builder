import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurriculumController } from './curriculum.controller';
import { Curriculum, CurriculumSchema } from './domain/subject.model';
import { CurriculumService } from './curriculum.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Curriculum.name, schema: CurriculumSchema },
    ]),
  ],
  controllers: [CurriculumController],
  providers: [CurriculumService],
})
export class CurriculumModule {}
