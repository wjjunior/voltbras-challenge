# VOLTBRAS (Backend Challenge)
> ## Recursos utilizados

- Docker
- Docker Compose
- Node v12
- Typescript
- Apollo Server
- Prisma
- Jest
- TDD
- DDD
- S.O.L.I.D

> ## Dependências locais para executar a API

- Docker
- Docker Compose

> ## Ambiente de desenvolvimento

Para executar o ambiente de desenvolvimento clone o projeto, execute os comandos abaixo raiz do projeto:

```
./setup.sh
```

Selecione a opção *1* para build do projeto.

Após finalizado acesse http://localhost:4000/

> ## Testes

Para executar os testes, execute o comando abaixo na raiz do projeto:

```
npm run test
```

Para gerar os relatórios de test coverage:

```
npm run test:ci
```

> ## Considerações

Tentei seguir ao máximo os princípios do SOLID e DDD embora ainda tenha bastante dúvidas trabalhando com essa arquitetura. 

O objetivo foi isolar os componentes e regras de negócio da API das dependências de infraestrutura, dessa forma ficaria fácil substituir qualquer fonte de dados e evitar a dependência do graphQL e Apollo Server.

Também utilizei packages de padronização de código e commits como o eslint, husky, git-commit-msg-linter e lint-staged.

Como se trata de uma versão dev a ser avaliada não preocupei em gerar a versão de produção e configurei o container para iniciar com "npm run dev".

Fiz todo o projeto utilizando prática TDD, porém devido ao husky sempre executar todos os testes antes de aceitar o commit é necessário commitar os arquivos alterados antes do commit "test".

> ### Dificuldades

- lib RESTDataSource:
  Como ela só funciona dentro do Apollo Server ficou difícil isolar a fonte de dados e passei a dependência dentro do constructor para as camadas inferiores. Não sei se foi a melhor solução.
####
- Prisma (^2.7.0-dev.40):
  Como nunca tinha trabalhado com essa ferramenta precisei aprender para utilizar no desafio. A versão de produção do prisma client (2.6.2) esta apresentando falhas na função de migration para criar os bancos temporários a serem utilizados no Jest. Gastei bastante tempo tentando solucionar, mas ao ler as issues do pacote no github identificaram o erro e foi solucionado na versão de dev e atualizei o projeto para utiliza-la.
####
- DDD + GraphQL:
  Foi a primeira vez que implementei o GraphQL em uma arquitetura DDD e fiquei com dúvidas do melhor local para armazenar os Schemas. Por fim optei por adiciona-los ao diretório main que seria onde eu adicionaria as Routes trabalhando com Express.


> ## Conclusão

Gostei muito do desafio e me empolguei fazendo, conheci alguns novos recursos como o Prisma e RESTDataSource e me diverti praticando e melhorando meus conhecimentos.

Como tive um prazo relativamente grande decidi exagerar um pouco na solução pensando em entregar um projeto bem estruturado com o DDD, focando na sua possível expansão e acabei fazendo algumas validações e melhorias que não foram solicitadas.

Porém deixando claro que em um tarefa real provavelmente teria optado por uma solução mais simples que atenderia a demanda :)

> ## ToDo

- O teste coverage não ficou 100% e pode ser melhorado;
- Os dados para os testes estão manuais no código, poderiam ser mocados e gerados aleatoriamente com o package faker;
- A integração com a Arcsecond causa um delay nas funções da API que dependem dela, poderia ser resolvido importando esses dados para um banco local ou utilizado o Redis para cache, porém dependeria de um conhecimento maior da API para frequência de atualização dos dados;

