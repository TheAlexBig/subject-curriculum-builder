import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createReadStream } from 'fs';
import { Subject, SubjectDocument } from './domain/subject.model';
import { parse } from 'csv-parse';
import { join } from 'path';
import { Model, Types } from 'mongoose';
import { SubjectDto, SubjectDtoPrerequisite } from 'src/subject/domain/subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
  ) {}

  async getFindAll(): Promise<Array<Subject>> {
    return this.subjectModel.find().populate('prerequisite').exec();
  }

  async getFindOneSubject(code: string): Promise<Subject> {
    return this.subjectModel.findOne({code}).populate('prerequisite').exec();
  }

  async getFindAllByCriteria(criteria: any): Promise<Array<SubjectDocument>>{
    return await this.subjectModel.find(criteria).exec();
  }

  async postCreateSubject(subjectDto: SubjectDto): Promise<Subject> {
    const createSubject = new this.subjectModel(subjectDto);
    return createSubject.save();
  }

  async postCreateMultipleSubjects(subjectDto: Array<SubjectDto>): Promise<Array<Subject>> {
    const result = this.subjectModel.insertMany(subjectDto, {ordered: true});
    return result;
  }

  async updatePrequesites(code: string, prerequisite: Array<string>, payload: any): Promise<Subject> {
    const subjectFound: SubjectDocument = await this.subjectModel.findOne({code}).exec();
    if(subjectFound==null) throw new HttpException('Subect not found', HttpStatus.NOT_FOUND);
    const prerequisiteFound: Array<SubjectDocument> = await this.getFindAllByCriteria({code: { $in: prerequisite }});
    Object.keys(payload).forEach((key:string)=>{
        subjectFound[key] =  payload[key];
    });
    subjectFound.prerequisite = prerequisiteFound;
    return await this.subjectModel.findOneAndUpdate({code},subjectFound, {returnOriginal: false}).populate('prerequisite').exec();
  }

  async putSetPrerequisites(SubjectDtoPrerequisite: Array<SubjectDtoPrerequisite>): Promise<Array<Subject>>{
      const result = SubjectDtoPrerequisite.map(item => this.updatePrequesites(item.code, item.prerequisite, []));    
    return Promise.all(result);
  }

  async putUpdateSubject(subjectDto: SubjectDto, code: string): Promise<Subject> {
    const {prerequisite, ...updatePayload} = subjectDto;
    return await this.updatePrequesites(code, prerequisite, updatePayload);
  }

  async deleteRemoveSubject(code: string) {
    this.subjectModel.findOneAndDelete({code}).exec();
  }

  async postUploadMockSyllabus(): Promise<Subject[]> {
    const promise: Subject[] = await Promise.resolve(getFileMock());
    return this.subjectModel.insertMany(promise);
  }

  async getMockFile(): Promise<Subject[]> {
    const promise = getFileMock();
    return promise.then((value) => {
      return value;
    });
  }
}

function getFileMock() {
  return new Promise<Subject[]>((resolve, reject) => {
    const parsedCsv = parse({ columns: true, delimiter: ';' });
    const response = createReadStream(
      join(__dirname, '..', 'public', 'base.csv'),
    ).pipe(parsedCsv);

    const fetchArray: Subject[] = [];
    response.on('data', (row: Subject) => {
      fetchArray.push(row);
    });
    response.on('end', () => resolve(fetchArray));
    response.on('error', reject);
  });
}
