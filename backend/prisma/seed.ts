import { PrismaClient } from '@prisma/client';
import { users } from './data/users';

const prisma = new PrismaClient();

async function main() {
  await prisma.users.deleteMany();
  for (const user of users) {
    await prisma.users.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
