import { IsSuitable } from '../../data/protocols/planet/is-suitabler'

const suitableMass = 25
// isso parece uma regra de negócio não deveria tar em outro lugar, longe do pacote "infra"?
export const planetAdapter: IsSuitable = planet =>
  planet.mass > suitableMass;
