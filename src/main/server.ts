import app from './config/app'

app.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`))
