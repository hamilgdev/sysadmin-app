import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  mapUserDto,
} from '@/src/modules/users/dto';
import { PrismaService } from '@/src/prisma/prisma.service';
import { ulid } from 'ulid';
import { PaginationDto } from '@/src/common/dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const record = await this.prisma.users.create({
        data: {
          guid: `us_${ulid()}`,
          ...createUserDto,
        },
      });

      const user = mapUserDto(record);
      return { user };
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 1 } = paginationDto || {};

      const page = offset - 1;
      const skip = page * limit;
      const [records, total] = await Promise.all([
        this.prisma.users.findMany({
          where: { deleted_at: null },
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
        }),
        this.prisma.users.count({
          where: { deleted_at: null },
        }),
      ]);

      const users = records.map(mapUserDto);
      return {
        users,
        metadatos: {
          total,
          page: page + 1,
          last_page: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(guid: string) {
    const record = await this.prisma.users.findUnique({ where: { guid } });

    if (!record) throw new NotFoundException(`User with id ${guid} not found.`);

    return { user: mapUserDto(record) };
  }

  async update(guid: string, updateUserDto: UpdateUserDto) {
    await this.findOne(guid);

    try {
      const record = await this.prisma.users.update({
        where: { guid },
        data: updateUserDto,
      });

      return { user: mapUserDto(record) };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(guid: string) {
    await this.findOne(guid);

    try {
      const record = await this.prisma.users.update({
        where: { guid },
        data: { deleted_at: new Date() },
      });

      return { user: mapUserDto(record) };
    } catch (error) {
      this.handleException(error);
    }
  }

  // method to handle exceptions

  private handleException(error: any) {
    if (error.code === 'P2002')
      throw new BadRequestException(
        `Unique constraint violated ${error.meta.target}`,
      );
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Something went wrong');
  }
}
