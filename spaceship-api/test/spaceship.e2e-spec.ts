import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { SpaceshipModel } from 'src/adapter/db/entities/spaceship.model';
import { AppModule } from 'src/app.module';
import { stopMongoInMemory } from 'src/infrastructure/tests/mongo-inmemory';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { v4 as uuid } from 'uuid';

describe('SpaceshipController (e2e)', () => {
  let app: INestApplication;
  const TEST_ID = uuid();
  const UPDATE_ID = uuid();
  const endpoint = 'spaceships';

  const spaceships: Partial<SpaceshipModel>[] = [
    {
      id: TEST_ID,
      name: 'New Ship',
      armour: 1,
      jump: 1,
      maxFuel: 1,
      maxPower: 1,
      size: 1,
      thrust: 1,
    },
    {
      id: UPDATE_ID,
      name: 'New Ship 2',
      armour: 2,
      jump: 2,
      maxFuel: 2,
      maxPower: 2,
      size: 2,
      thrust: 2,
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    const dataSource = moduleFixture.get<DataSource>(getDataSourceToken());
    await app.init();

    // create test data
    await dataSource.createEntityManager().insert(SpaceshipModel, spaceships);
  });

  afterAll(async () => {
    await stopMongoInMemory();
    await Promise.all([app.close()]);
  });

  it(`/${endpoint} (GET)`, async () => {
    const response = await request(app.getHttpServer()).get(`/${endpoint}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(2);
  });

  it(`/${endpoint}/:id (GET)`, async () => {
    const response = await request(app.getHttpServer()).get(
      `/${endpoint}/${TEST_ID}`,
    );
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body === 'object').toBeTruthy();
  });

  it(`/${endpoint}/:id (GET) should fail`, async () => {
    const response = await request(app.getHttpServer()).get(
      `/${endpoint}/${uuid()}`,
    );
    expect(response.status).toEqual(404);
    expect(response.body).toBeDefined();
    expect(typeof response.body === 'object').toBeTruthy();
  });

  it(`/${endpoint}/:id (GET) should fail validation`, async () => {
    const response = await request(app.getHttpServer()).get(
      `/${endpoint}/NOT_UUID`,
    );
    expect(response.status).toEqual(400);
    expect(response.body).toBeDefined();
    expect(typeof response.body === 'object').toBeTruthy();
  });

  it(`/${endpoint} (POST)`, async () => {
    const response = await request(app.getHttpServer())
      .post(`/${endpoint}`)
      .send({
        name: 'Name',
        size: 1,
        armour: 1,
        thrust: 1,
        jump: 1,
        maxPower: 1,
        maxFuel: 1,
      });
    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
  });

  it(`/${endpoint} (POST) should fail`, async () => {
    const response = await request(app.getHttpServer())
      .post(`/${endpoint}`)
      .send({
        name: 'Name',
        size: 1,
        armour: 1,
        thrust: 1,
        jump: 1,
        maxPower: 1,
        maxFuel: 1,
      });
    expect(response.status).toEqual(400);
    expect(response.body).toBeDefined();
    expect(response.body?.statusCode).toBeDefined();
    expect(response.body?.message).toBeDefined();
  });

  it(`/${endpoint} (POST) should fail validation`, async () => {
    const response = await request(app.getHttpServer())
      .post(`/${endpoint}`)
      .send({
        name: 'Some Name',
        size: 'NOT_A_NUMBER',
        armour: 1,
        thrust: 1,
        jump: 1,
        maxPower: 1,
        maxFuel: 1,
      });
    expect(response.status).toEqual(400);
    expect(response.body).toBeDefined();
    expect(response.body?.statusCode).toBeDefined();
    expect(response.body?.message).toBeDefined();
  });

  it(`/${endpoint} (DELETE)`, async () => {
    const response = await request(app.getHttpServer()).delete(
      `/${endpoint}/${TEST_ID}`,
    );
    expect(response.status).toEqual(200);
  });

  it(`/${endpoint} (DELETE) should fail`, async () => {
    const response = await request(app.getHttpServer()).delete(
      `/${endpoint}/${TEST_ID}`,
    );
    expect(response.status).toEqual(404);
  });

  it(`/${endpoint} (PATCH)`, async () => {
    const response = await request(app.getHttpServer())
      .patch(`/${endpoint}/${UPDATE_ID}`)
      .send({ name: 'New Name' });
    expect(response.status).toEqual(200);
  });

  it(`/${endpoint} (PATCH) should fail`, async () => {
    const response = await request(app.getHttpServer())
      .patch(`/${endpoint}/${uuid()}`)
      .send({ name: 'New Name' });
    expect(response.status).toEqual(404);
  });
});
