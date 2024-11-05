import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CrewInSpaceshipUseCases } from 'src/application/usecases/crew-in-spaceship.usecase';
import { CreateCrewmanDTO } from 'src/domain/dto/create-crewman.dto';
import { CrewmanDTO } from 'src/domain/dto/crewman.dto';
import { CrewmanInSpaceshipDTO } from 'src/domain/dto/get-crewman-in-spaceship.dto';
import { IdDTO } from 'src/domain/dto/id.dto';
import { CrewmanMapper } from './crewman.mapper';

@Controller('spaceships')
export class CrewInSpaceshipController {
  constructor(private readonly useCases: CrewInSpaceshipUseCases) {}

  @Get(':shipId/crew/:crewmanId')
  async getOne(@Param() dto: CrewmanInSpaceshipDTO): Promise<CrewmanDTO> {
    const crewman = await this.useCases.getByShip(dto.shipId, dto.crewmanId);
    const result = CrewmanMapper.toApi(crewman);
    return result;
  }

  @Post(':id/crew/')
  async create(@Param() { id }: IdDTO, @Body() dto: CreateCrewmanDTO) {
    const entity = await this.useCases.createByShip(id, dto);
    const result = CrewmanMapper.toApi(entity);
    return result;
  }

  @Delete(':shipId/crew/:crewmanId')
  async delete(@Param() dto: CrewmanInSpaceshipDTO): Promise<CrewmanDTO> {
    const entity = await this.useCases.deleteByShip(dto.shipId, dto.crewmanId);
    return CrewmanMapper.toApi(entity);
  }
}
