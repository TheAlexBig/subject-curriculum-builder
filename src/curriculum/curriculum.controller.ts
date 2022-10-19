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
import { CurriculumDto } from './domain/curriculum.dto';
import { Curriculum } from './domain/curriculum.model';
import { CurriculumService } from './curriculum.service';

@Controller('curriculums')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get('all')
  getFindAll(): Promise<Curriculum[]> {
    return this.curriculumService.findAll();
  }

  @Get(':id')
  getFindOneCurriculum(@Param('id') id: string): Promise<Curriculum> {
    return this.curriculumService.getFindOneCurriculum(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  postCreateCurriculum(@Body() body: CurriculumDto): Promise<Curriculum> {
    return this.curriculumService.postCreateCurriculum(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  putUpdateCurriculum(
    @Body() body: CurriculumDto,
    @Param('id') id: string,
  ): Promise<Curriculum> {
    return this.curriculumService.putUpdateCurriculum(body, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteRemoveSubject(
    @Param('id') id: string
  ){
    this.curriculumService.deleteRemoveCurriculum(id);
  }
}
