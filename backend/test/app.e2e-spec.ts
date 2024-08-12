import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/src/app.module';
import { PrismaService } from '@/src/prisma/prisma.service';

describe('HealthyController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/healthy (GET)', () => {
    return request(app.getHttpServer())
      .get('/healthy')
      .expect(200)
      .expect({ ok: true });
  });
});
