import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SubjectService } from './subject.service';
import { SubjectDto, SubjectDtoPrerequisite } from './domain/subject.dto';
import { Subject } from './domain/subject.model';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('/all')
  getFindAll(): Promise<Array<Subject>> {
    return this.subjectService.getFindAll();
  }

  @Get(':code')
  getFindOneSubject(@Param('code') code: string): Promise<Subject> {
    return this.subjectService.getFindOneSubject(code);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  postCreateSubjects(@Body() body: SubjectDto): Promise<Subject> {
    return this.subjectService.postCreateSubject(body);
  }

  @Post('/multiple')
  @UseGuards(JwtAuthGuard)
  postCreateMultipleSubjects(@Body() body: Array<SubjectDto>): Promise<Array<Subject>>{
      return this.subjectService.postCreateMultipleSubjects(body);
  }

  @Put('/prerequisites')
  @UseGuards(JwtAuthGuard)
  putSetPrerequisite(@Body() body: Array<SubjectDtoPrerequisite>): Promise<Array<Subject>>{
      return this.subjectService.putSetPrerequisites(body);
  }


  @Put(':code')
  @UseGuards(JwtAuthGuard)
  putUpdateSubject(
    @Body() body: SubjectDto,
    @Param('code') code: string,
  ): Promise<Subject> {
    return this.subjectService.putUpdateSubject(body, code);
  }

  @Delete(':code')
  @UseGuards(JwtAuthGuard)
  deleteRemoveSubject(
    @Param('code') code: string
  ){
    this.subjectService.deleteRemoveSubject(code);
  }

  @Get('/mock-file')
  getMockSyllabus(): Promise<Subject[]> {
    return this.subjectService.getMockFile();
  }

  @Post('/mock-upload')
  postUploadMockSubjects(): Promise<Subject[]> {
    return this.subjectService.postUploadMockSyllabus();
  }
}
