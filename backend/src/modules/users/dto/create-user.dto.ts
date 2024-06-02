import { Users } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsString()
  email: string;
}

export function mapUserDto(user: Users) {
  return {
    ...user,
    created_at: user.created_at.toISOString(),
    deleted_at: user.deleted_at?.toISOString() || null,
  };
}
