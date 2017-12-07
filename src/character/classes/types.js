//@flow
type Stat = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export type ClassReq = [Stat, number];

type SavingThrow = [number, number, number, number, number, number, number];
type SkillType = '%' | ' in 6';

export type Skill = {
  name: string,
  table: number[],
  type?: SkillType
};

export type SkillAtLevel = {
  name: string,
  value: number,
  type?: SkillType
};

export type ClassFeature = {
  name: string,
  pageNum: number,
  table?: Array<string | number>,
  list?: Array<any>
};

export type Level = [number, number, number];

export type CharacterClass = {
  name: string,
  requirements: Array<ClassReq>,
  primeReq: Array<Stat>,
  hd: number,
  maxLevel: number,
  thaco: Array<number[]>,
  saves: Array<SavingThrow>,
  features: Array<ClassFeature>,
  progression: Array<Level>,
  spells?: Array<number[]>,
  skills?: Skill[]
};
