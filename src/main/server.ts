import app from './config/app'
import { PrismaHelper } from '../infra/db/postgresql/helpers/prismaHelper'

PrismaHelper.connect()
  .then(async () => {
    app.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`))
  })
  .catch(console.error)
