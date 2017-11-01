//@flow
type Stat = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

type ClassReq = [Stat, number];

type SavingThrow = [number, number, number, number, number, number, number];

type ClassFeature = {
  name: string,
  pageNum: number,
  table?: Array<string | number>,
  list?: Array<any>
};

type Level = [number, number, number];

export type CharacterClass = {
  [key: string]: {
    requirements: Array<ClassReq>,
    primeReq: Stat,
    hd: number,
    maxLevel: number,
    saves: Array<SavingThrow>,
    features: Array<ClassFeature>,
    progression: Array<Level>
  }
};
