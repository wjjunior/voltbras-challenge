export interface ArcsecondPlanet {
  name: string
  mass?: {
    value: number
    unit: string
  }
}

export interface ArcsecondPlanetReponse {
  count: number
  next: string
  previous: string
  results: ArcsecondPlanet[]
}
