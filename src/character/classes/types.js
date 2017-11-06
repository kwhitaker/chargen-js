//@flow
type Stat = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export type ClassReq = [Stat, number];

type SavingThrow = [number, number, number, number, number, number, number];

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
  thaco: Array<[number]>,
  saves: Array<SavingThrow>,
  features: Array<ClassFeature>,
  progression: Array<Level>
};
