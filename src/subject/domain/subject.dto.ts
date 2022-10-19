import { Term } from './subject.term.dto';

class SubjectDto {
  term: Term;
  code: string;
  uv: number;
  name: string;
  description: string;
  weight: number;
  prerequisite: Array<string>;

  constructor(
    term: Term,
    code: string,
    uv: number,
    name: string,
    description: string,
    weight: number,
    prerequisite: Array<string>,
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

class SubjectDtoPrerequisite {
  code: string;
  prerequisite: Array<string>;
}

export { SubjectDto, SubjectDtoPrerequisite };
