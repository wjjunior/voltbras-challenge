// de novo podemos usar uma simples função pra isso
// mas entendo que pode ser uma escolha estética também :)
// ---
// talvez seja interessante dar uma tipada nisso
// uma Validation seria algo que pega algo de um tipo T
// e retorna um Error | undefined(nesse caso, vamos suportar promises também)
type Sometime<T> = T | Promise<T>; // ps: tentei achar um nome melhor, eu juro hahaha
export interface Validation<T = any> {
  validate: (input: T) => Sometime<Error | undefined>
}
