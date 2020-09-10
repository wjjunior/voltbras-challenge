export const graphqlResolverHelper = (useCase: any) => {
  return (_source: any, args: any, { dataSources }) => useCase(args,dataSources)
}
