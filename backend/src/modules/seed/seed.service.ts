import { users } from '@/prisma/data/users';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async execute() {
    await this.truncateTables();
    await this.seedUsers();
    return { message: 'Seeding completed' };
  }

  private async truncateTables() {
    await this.prisma.users.deleteMany();
  }

  private async seedUsers() {
    const records = users;
    for (const record of records) {
      await this.prisma.users.create({
        data: record,
      });
    }
  }
}
