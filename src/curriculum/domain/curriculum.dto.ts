import { TermDto } from './curriculum.dto.term';

class CurriculumDto {
  name: string;
  subjects: Array<TermDto>;
}

export { CurriculumDto };
