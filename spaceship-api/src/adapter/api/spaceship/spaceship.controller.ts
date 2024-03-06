import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ShipUseCases } from 'src/application/usecases/ship.usecase';
import { CreateSpaceShipDTO } from 'src/domain/dto/create-spaceship.dto';
import { SpaceshipDTO } from 'src/domain/dto/spaceship.dto';
import { Log } from 'src/adapter/api/utils/log';
import { DeleteSpaceshipDTO } from 'src/domain/dto/delete-spaceship.dto';
import { IdDTO } from 'src/domain/dto/id.dto';
import { UpdateSpaceshipDTO } from 'src/domain/dto/update-spaceship.dto';
import { SpaceshipMapper } from './spaceship.mapper';

@Controller('spaceship')
export class SpaceshipController {
  constructor(private readonly useCases: ShipUseCases) {}

  @Get()
  @Log()
  async getAll(): Promise<SpaceshipDTO[]> {
    const spaceships = await this.useCases.getAll();
    const dtos = spaceships.map((e) => SpaceshipMapper.toApi(e));
    return dtos;
  }

  @Post()
  @Log()
  async create(@Body() dto: CreateSpaceShipDTO): Promise<string> {
    const id = await this.useCases.create(dto);
    return id;
  }

  @Delete(':id')
  @Log()
  async delete(@Param() dto: DeleteSpaceshipDTO): Promise<SpaceshipDTO> {
    const spaceship = await this.useCases.delete(dto);
    return SpaceshipMapper.toApi(spaceship);
  }

  @Put(':id')
  @Log()
  async update(@Param() { id }: IdDTO, @Body() dto: UpdateSpaceshipDTO) {
    await this.useCases.update(id, dto);
  }
}
