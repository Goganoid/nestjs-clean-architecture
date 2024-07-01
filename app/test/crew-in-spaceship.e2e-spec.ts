import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { Model, Types } from 'mongoose';
import { CrewmanModel } from 'src/adapter/db/entities/crewman.model';
import { SpaceshipModel } from 'src/adapter/db/entities/spaceship.model';
import { AppModule } from 'src/app.module';
import { CrewmanRole } from 'src/domain/enums/crewman-role.enum';
import { stopMongoInMemory } from 'src/infrastructure/tests/mongo-inmemory';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { v4 as uuid } from 'uuid';

describe('CrewInSpaceshipController (e2e)', () => {
  let app: INestApplication;
  const SPACESHIP_ID = uuid();
  const CREWMAN_ID = new Types.ObjectId();
  const UPDATE_CREWMAN_ID = new Types.ObjectId();
  let createdCrewmanId: string | null = null;
  const spaceships: Partial<SpaceshipModel>[] = [
    {
      id: SPACESHIP_ID,
      name: 'New Ship',
      armour: 1,
      jump: 1,
      maxFuel: 1,
      maxPower: 1,
      size: 1,
      thrust: 1,
    },
  ];
  const crew = [
    {
      _id: CREWMAN_ID,
      birthDate: new Date(),
      name: 'Test',
      role: CrewmanRole.ENGINEER,
      salary: 500,
    },
    {
      _id: UPDATE_CREWMAN_ID,
      birthDate: new Date(),
      name: 'Test',
      role: CrewmanRole.ENGINEER,
      salary: 500,
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    const dataSource = moduleFixture.get<DataSource>(getDataSourceToken());
    const mongoModel = moduleFixture.get<Model<CrewmanModel>>(
      getModelToken(CrewmanModel.name),
    );
    await app.init();

    // create test data
    await dataSource.createEntityManager().insert(SpaceshipModel, spaceships);
    await mongoModel.create(crew);
  });

  afterAll(async () => {
    await stopMongoInMemory();
    await Promise.all([app.close()]);
  });

  it('/spaceships/:id/crew (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post(`/spaceships/${SPACESHIP_ID}/crew`)
      .send({
        name: 'Name',
        role: CrewmanRole.CAPTAIN,
        birthDate: new Date().toISOString(),
        salary: 500,
      });
    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
    createdCrewmanId = response.body.id;
  });

  it('/spaceships/:id/crew/:id (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      `/spaceships/${SPACESHIP_ID}/crew/${createdCrewmanId}`,
    );
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(createdCrewmanId);
  });

  it('/spaceships/:id/crew/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/spaceships/${SPACESHIP_ID}/crew/${createdCrewmanId}`,
    );
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(createdCrewmanId);
  });
});
