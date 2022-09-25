import { Term } from './subject.term.dto';

class SubjectDto {
  term: Term;
  code: string;
  uv: number;
  name: string;
  description: string;
  weight: number;
  prerequisite: SubjectDto[];

  constructor(
    term: Term,
    code: string,
    uv: number,
    name: string,
    description: string,
    weight: number,
    prerequisite: SubjectDto[],
  ) {
    this.term = term;
    this.code = code;
    this.uv = uv;
    this.name = name;
    this.description = description;
    this.weight = weight;
    this.prerequisite = prerequisite;
  }
}

export { SubjectDto };
