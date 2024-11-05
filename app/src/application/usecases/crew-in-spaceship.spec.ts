import { TestBed } from '@automock/jest';
import { ApiException } from 'src/domain/base/api.exception';
import { CreateCrewmanDTO } from 'src/domain/dto/create-crewman.dto';
import { CrewmanRole } from 'src/domain/enums/crewman-role.enum';
import { SpaceshipCrewMessagePublisher } from '../interfaces/message-broker';
import { CrewmanRepository } from '../repositories/crewman.abstract-repository';
import { CrewInSpaceshipUseCases } from './crew-in-spaceship.usecase';
import { CrewmanUseCases } from './crewman.usecase';

describe('CrewInSpaceshipUseCases', () => {
  let service: CrewInSpaceshipUseCases;
  let crewmanRepository: jest.Mocked<CrewmanRepository>;
  let crewmanUseCases: jest.Mocked<CrewmanUseCases>;
  let publisher: jest.Mocked<SpaceshipCrewMessagePublisher>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CrewInSpaceshipUseCases).compile();

    service = unit;

    crewmanRepository = unitRef.get(CrewmanRepository as any);
    crewmanUseCases = unitRef.get(CrewmanUseCases);
    publisher = unitRef.get(SpaceshipCrewMessagePublisher as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getByShip', () => {
    it('should return crewman if relation exists', async () => {
      const mockCrewmanId = 'crewmanId';
      const mockShipId = 'shipId';
      const mockCrewman = { id: mockCrewmanId } as any;
      crewmanRepository.get.mockResolvedValue(mockCrewman);

      const result = await service.getByShip(mockShipId, mockCrewmanId);

      expect(result).toEqual(mockCrewman);
    });

    it('should throw ApiException if crewman not found', async () => {
      const mockCrewmanId = 'crewmanId';
      const mockShipId = 'shipId';
      crewmanRepository.get.mockResolvedValue(null);

      await expect(
        service.getByShip(mockShipId, mockCrewmanId),
      ).rejects.toThrow(ApiException);
    });

    it('should throw ApiException if relation does not exist', async () => {
      const mockCrewmanId = 'crewmanId';
      const mockShipId = 'shipId';
      crewmanRepository.getOneWhere.mockResolvedValue(null);

      await expect(
        service.getByShip(mockShipId, mockCrewmanId),
      ).rejects.toThrow(ApiException);
    });
  });

  describe('deleteByShip', () => {
    it('should delete crewman by ship', async () => {
      const mockCrewmanId = 'crewmanId';
      const mockShipId = 'shipId';
      const mockCrewman = { id: mockCrewmanId } as any;
      crewmanRepository.remove.mockResolvedValue(mockCrewman);

      const result = await service.deleteByShip(mockShipId, mockCrewmanId);

      expect(result).toEqual(mockCrewman);
    });

    it('should throw ApiException if relation does not exist', async () => {
      const mockCrewmanId = 'crewmanId';
      const mockShipId = 'shipId';

      await expect(
        service.deleteByShip(mockShipId, mockCrewmanId),
      ).rejects.toThrow(ApiException);
    });
  });

  describe('createByShip', () => {
    it('should create crewman by ship', async () => {
      const mockShipId = 'shipId';
      const mockDto: CreateCrewmanDTO = {
        name: 'New Ship',
        birthDate: new Date().toString(),
        role: CrewmanRole.CAPTAIN,
        salary: 500,
      };
      const mockCrewman = { id: 'crewmanId' } as any;
      crewmanUseCases.create.mockResolvedValue(mockCrewman);

      const result = await service.createByShip(mockShipId, mockDto);

      expect(result).toEqual(mockCrewman);
      expect(publisher.publish).toHaveBeenCalled();
    });
  });
});
