import { PrismaClient } from '@prisma/client'

// esse cara parece semânticamente e sintáticamente equivalente
// ao próprio PrismaClient, não?
// PrismaHelper.connect().then(f)
// vs.
// new PrismaClient().connect().then(f)
// e também
// const prisma = PrismaHelper; await prisma.connect(); await prisma.disconnect();
// const prisma = new PrismaClient(); await prisma.connect(); await prisma.$disconnect();
// ---
// depois eu vi que você usa ele como se o pacote já fosse o próprio client né?
// nesse caso uma outra possível sugestão seria passar o PrismaClient como dependência da classe/argumento da função
export const PrismaHelper = {
  client: null as PrismaClient,

  async connect(): Promise<void> {
    this.client = new PrismaClient()
    // não falta um .connect aqui?
    // this.client.$connect();
  },

  async disconnect(): Promise<void> {
    await this!.client!.$disconnect()
  }

}
