import { PrismaClient } from '@prisma/client'

export const PrismaHelper = {
  client: null as PrismaClient,

  async connect (): Promise<void> {
    this.client = new PrismaClient()
  },

  async disconnect (): Promise<void> {
    await this.client.$disconnect()
  }

}
