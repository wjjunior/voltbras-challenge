import { PlanetModel } from '../../../domain/models/planet'

// nem tudo precisa ser que nem Java hahaha(brincadeira)
// podemos tirar esse objeto e usar uma interface
// de função aqui também, fica um pouco mais enxuto
export interface IsSuitable {
  (planet: PlanetModel): boolean
}
