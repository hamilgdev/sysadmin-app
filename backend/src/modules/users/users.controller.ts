import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@/src/modules/users/dto';
import { PaginationDto } from '@/src/common/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':guid')
  findOne(@Param('guid') guid: string) {
    return this.usersService.findOne(guid);
  }

  @Patch(':guid')
  update(@Param('guid') guid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(guid, updateUserDto);
  }

  @Delete(':guid')
  remove(@Param('guid') guid: string) {
    return this.usersService.remove(guid);
  }
}
