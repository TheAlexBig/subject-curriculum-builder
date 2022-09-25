import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurriculumDto } from './domain/subject.dto';
import { Curriculum, CurriculumDocument } from './domain/subject.model';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectModel(Curriculum.name)
    private curriculumModel: Model<CurriculumDocument>,
  ) {}

  async findAll(): Promise<Curriculum[]> {
    return this.curriculumModel.find().exec();
  }

  async getFindOneCurriculum(id: string): Promise<Curriculum> {
    return this.curriculumModel.findById(id).populate('subjects').exec();
  }

  async postCreateCurriculum(
    curriculumDto: CurriculumDto,
  ): Promise<Curriculum> {
    const createCurriculum = new this.curriculumModel(curriculumDto);
    return createCurriculum.save();
  }

  async putUpdateCurriculum(
    curriculumDto: CurriculumDto,
    id: string,
  ): Promise<Curriculum> {
    const curriculum = await this.curriculumModel
      .findByIdAndUpdate(id, curriculumDto, { returnOriginal: false })
      .exec();
    return curriculum;
  }
}
