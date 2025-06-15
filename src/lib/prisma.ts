import { PrismaClient } from '@/generated/prisma';
import { PrismaD1 } from '@prisma/adapter-d1';
import { getCloudflareContext } from '@opennextjs/cloudflare';

const prismaClients = {
  fetch(db: D1Database) {
    const adapter = new PrismaD1(db);
    const prisma = new PrismaClient({ adapter });
    return prisma;
  },
};

export async function getPrisma() {
  const { env } = await getCloudflareContext({ async: true });
  return prismaClients.fetch(env.DB);
}

export default prismaClients;
