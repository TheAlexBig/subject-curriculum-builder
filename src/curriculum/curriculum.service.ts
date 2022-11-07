import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectService } from 'src/subject/subject.service';
import { CurriculumDto } from './domain/curriculum.dto';
import { Curriculum, CurriculumDocument } from './domain/curriculum.model';
import { Term } from './domain/curriculum.model.subject';

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
    return this.curriculumModel.findById(id).populate('subjects.subject').exec();
  }

  async postCreateCurriculum(
    curriculumDto: CurriculumDto,
  ): Promise<Curriculum> {
    const createCurriculum = new this.curriculumModel();
    await this.prepareCurriculum(curriculumDto, createCurriculum);
    const persist = await createCurriculum.save();
    return persist.populate('subjects.subject');
  }

  async putUpdateCurriculum(
    curriculumDto: CurriculumDto,
    id: string,
  ): Promise<Curriculum> {
  
    const curriculumFound : Curriculum = await this.curriculumModel.findById(id, curriculumDto, { returnOriginal: false }).exec();
    if(curriculumFound==null) throw new HttpException('Curriculum not found', HttpStatus.NOT_FOUND);
    await this.prepareCurriculum(curriculumDto, curriculumFound);
    return (await this.curriculumModel.findByIdAndUpdate(id, curriculumFound, {returnOriginal: false})).populate('subjects.subject');
  }

  async prepareCurriculum(curriculumDto: CurriculumDto, curriculum){
    const codeSubjectReference = [];

    const codes : Array<string> = curriculumDto.subjects.map(v=>{
      const dto = {};
      dto[v.code] = null;
      codeSubjectReference.push(dto);
      return v.code;
    });

    const resolve = await this.subjectService.getFindAllByCriteria({code: { $in: codes }});

    resolve.map(v=>{
      codeSubjectReference[v.code] = v._id;
      return v;
    });
    
    curriculum.name = curriculumDto.name;
    curriculum.subjects = curriculumDto.subjects
        .filter(v=> codeSubjectReference[v.code])
        .map(v=> {
        const createTerm = new Term();
        createTerm.display = v.display;
        createTerm.index = v.index;
        createTerm.subject = codeSubjectReference[v.code];
        return createTerm;
    });
  }

  async deleteRemoveCurriculum(id: string) {
    this.curriculumModel.findByIdAndDelete(id).exec();
  }
}
