# Code Review Notes

Primeiramente Wagner, parabéns, deu de ver que foi posto muito esforço e dedicação para a realização desse projeto.
Tenha certeza que foi bem apreciado seu esforço e que vou tentar contribuir algum conhecimento de volta, mesmo que pouco.

Segundamente, aprendi mais de Clean Architecture com esse código, confesso que não estava muito acostumado, mas achei legal,
parece uma ótima ferramenta pra diminuir o acoplamento. A estrutura geral do projeto/arquitetura do projeto, como você falou,
deu um sentimento de over-engineered. mas pra projetos pequenos dá esse sentimento que não faz muito sentido, mas pra projetos
maiores dá de ver como ele pode ficar mais escalável.

Terceiramente, daí acho que é um pensamento mais "opinionated" meu, pode ser que o contraste do projeto pequeno com a abundância
de Factories e Interfaces, deu um sentimento de que a maioria das Factories e uma pequena parcela das Interfaces(i'm looking at you ArcSecondXXX)
foram desnecessárias. Sinto que POO deu uma ótima estruturada em pensamentos, mas em JS _functions are first-class citizens_([]<https://en.wikipedia.org/wiki/First-class_function>), e sinto que em *vários* lugares poderia ter se usado funções em vez de classes/objetos, em especial na parte de validação(_Validation_), que faz muito mais sentido(na minha visão), ser algo funcional, pois é algo que entra X, e sai Y(no caso erro ou não-erro).

Outros pontos:

- Gostei bastante do test coverage, ótimo ponto, até aprendi umas coisas do jest que não sabia;
- Gostei de ter usado Typescript, porém senti falta de tipagem em vários lugares, teve vários `any` e poderia ter utilizado mais template types(veja a seção em seguida);
- Achei meio estranho ter criado as interfaces HttpRequest e HttpResponse, acredito que poderia muito bem não ter se atrelado a camada de rede(HTTP), e talvez feito uso de algum template type(generic) para passar a ideia de que a response tem que ter um campo com os argumentos e a response avisando se deu certo, ou errado:

```typescript
type Request<T> = { input: T };
type ResponseStatus = 'Unauthorized' | 'ServerError' | 'OK' | ...;
type Response<T> = {
  data?: T,
  status: ResponseStatus;
};

type Handler<Req, Res> = (req: Request<Req>) => Response<Res>
// ou usar type-constraint
// type Handler<Req extends Request, ...> ...

// e daí finalmente só atrelar o necessário a HTTP
const getHTTPStatusCode = (status: ResponseStatus): number => {
  switch (status) {
    case 'OK': return 200;
    case 'Unauthorized': return 401;
    case 'ServerError': return 500;
  }
}
```

PS:
Só pra avisar eu tava mudando alguns arquivos pra seguir meu estilo, mas daí quando fui commitar vi que
era o estilo definido do projeto, então desconsidera as mudanças que vão de contra o code styleguide definido
já que é só coisa de estilo :) i.e.:

`Functions that return promises must be async  @typescript-eslint/promise-function-async`

Parabéns, pelo ótimo trabalho Wagner!! :)
