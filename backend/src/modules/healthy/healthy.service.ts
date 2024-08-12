import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthyService {
  check(): { ok: boolean } {
    return { ok: true };
  }
}
