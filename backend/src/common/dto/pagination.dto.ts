import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @Min(1)
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  offset?: number = 1;
}
