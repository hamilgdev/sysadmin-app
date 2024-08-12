import { Controller, Get } from '@nestjs/common';
import { HealthyService } from './healthy.service';

@Controller('healthy')
export class HealthyController {
  constructor(private readonly healthyService: HealthyService) {}

  @Get()
  async check(): Promise<{ ok: boolean }> {
    return this.healthyService.check();
  }
}
