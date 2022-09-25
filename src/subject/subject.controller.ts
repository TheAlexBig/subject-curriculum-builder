import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SubjectService } from './subject.service';
import { SubjectDto } from './domain/subject.dto';
import { Subject } from './domain/subject.model';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('/all')
  getFindAll(): Promise<SubjectDto[]> {
    return this.subjectService.getFindAll();
  }

  @Get(':id')
  getFindOneSubject(@Param('id') id: string): Promise<Subject> {
    return this.subjectService.getFindOneSubject(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  postCreateRecord(@Body() body: SubjectDto): Promise<SubjectDto> {
    return this.subjectService.postCreateSubject(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  putUpdateSubject(
    @Body() body: SubjectDto,
    @Param('id') id: string,
  ): Promise<SubjectDto> {
    return this.subjectService.putUpdateSubject(body, id);
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
