import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from '@/src/config';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from '@/src/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
