import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from '@/src/config';
import { CommonModule } from '@/src/common/common.module';
import { UsersModule } from './modules/users/users.module';
import { SeedModule } from './modules/seed/seed.module';
import { HealthyModule } from './modules/healthy/healthy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
    }),
    UsersModule,
    CommonModule,
    SeedModule,
    HealthyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
