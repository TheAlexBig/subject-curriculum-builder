import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectDocument } from 'src/subject/domain/subject.model';
import { SubjectService } from 'src/subject/subject.service';
import { CurriculumDto } from './domain/curriculum.dto';
import { Curriculum, CurriculumDocument } from './domain/curriculum.model';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectModel(Curriculum.name)
    private curriculumModel: Model<CurriculumDocument>,
    private readonly subjectService: SubjectService
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
    const createCurriculum = new this.curriculumModel();
    const subjects: Array<SubjectDocument> = await this.subjectService.getFindAllByCriteria({code: { $in: curriculumDto.subjects }});
    createCurriculum.name = curriculumDto.name;
    createCurriculum.subjects = subjects;
    return createCurriculum.save();
  }

  async putUpdateCurriculum(
    curriculumDto: CurriculumDto,
    id: string,
  ): Promise<Curriculum> {
  
    const curriculumFound : Curriculum = await this.curriculumModel.findById(id, curriculumDto, { returnOriginal: false }).exec();
    if(curriculumFound==null) throw new HttpException('Curriculum not found', HttpStatus.NOT_FOUND);
    const subjects: Array<SubjectDocument> = await this.subjectService.getFindAllByCriteria({code: { $in: curriculumDto.subjects }});
    curriculumFound.name = curriculumDto.name;
    curriculumFound.subjects = subjects;
    return this.curriculumModel.findByIdAndUpdate(id, curriculumFound, {returnOriginal: false});
  }

  async deleteRemoveCurriculum(id: string) {
    this.curriculumModel.findByIdAndDelete(id).exec();
  }
}
