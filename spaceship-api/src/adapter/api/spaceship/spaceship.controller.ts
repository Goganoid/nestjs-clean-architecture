import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Log } from 'src/adapter/api/utils/log';
import { ShipUseCases } from 'src/application/usecases/ship.usecase';
import { CreateSpaceShipDTO } from 'src/domain/dto/create-spaceship.dto';
import { DeleteSpaceshipDTO } from 'src/domain/dto/delete-spaceship.dto';
import { IdDTO } from 'src/domain/dto/id.dto';
import { SpaceshipDTO } from 'src/domain/dto/spaceship.dto';
import { UpdateSpaceshipDTO } from 'src/domain/dto/update-spaceship.dto';
import { SpaceshipMapper } from './spaceship.mapper';

@Controller('spaceships')
export class SpaceshipController {
  constructor(private readonly useCases: ShipUseCases) {}

  @Get()
  @Log()
  async getAll(): Promise<SpaceshipDTO[]> {
    const spaceships = await this.useCases.getAll();
    const result = spaceships.map((e) => SpaceshipMapper.toApi(e));
    return result;
  }

  @Get(':id')
  @Log()
  async getOne(@Param() dto: IdDTO): Promise<SpaceshipDTO> {
    const spaceship = await this.useCases.getOne(dto);
    const result = SpaceshipMapper.toApi(spaceship);
    return result;
  }

  @Post()
  @Log()
  async create(@Body() dto: CreateSpaceShipDTO) {
    const entity = await this.useCases.create(dto);
    const result = SpaceshipMapper.toApi(entity);
    return result;
  }

  @Delete(':id')
  @Log()
  async delete(@Param() dto: DeleteSpaceshipDTO): Promise<SpaceshipDTO> {
    const spaceship = await this.useCases.delete(dto);
    return SpaceshipMapper.toApi(spaceship);
  }

  @Patch(':id')
  @Log()
  async update(@Param() { id }: IdDTO, @Body() dto: UpdateSpaceshipDTO) {
    await this.useCases.update(id, dto);
  }
}
