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
import { CrewmanUseCases } from 'src/application/usecases/crewman.usecase';
import { CreateCrewmanDTO } from 'src/domain/dto/create-crewman.dto';
import { CrewmanDTO } from 'src/domain/dto/crewman.dto';
import { DeleteCrewmanDTO } from 'src/domain/dto/delete-crewman.dto';
import { ObjectIdDTO } from 'src/domain/dto/object-id.dto';
import { UpdateCrewmanDTO } from 'src/domain/dto/update-crewman.dto';
import { CrewmanMapper } from './crewman.mapper';

@Controller('crew')
export class CrewmanController {
  constructor(private readonly useCases: CrewmanUseCases) {}

  @Get()
  @Log()
  async getAll(): Promise<CrewmanDTO[]> {
    const crew = await this.useCases.getAll();
    const result = crew.map((e) => CrewmanMapper.toApi(e));
    return result;
  }

  @Get(':id')
  @Log()
  async getOne(@Param() dto: ObjectIdDTO): Promise<CrewmanDTO> {
    const entity = await this.useCases.getOne(dto);
    const result = CrewmanMapper.toApi(entity);
    return result;
  }

  @Post()
  @Log()
  async create(@Body() dto: CreateCrewmanDTO) {
    const entity = await this.useCases.create(dto);
    const result = CrewmanMapper.toApi(entity);
    return result;
  }

  @Delete(':id')
  @Log()
  async delete(@Param() dto: DeleteCrewmanDTO): Promise<CrewmanDTO> {
    const entity = await this.useCases.delete(dto);
    return CrewmanMapper.toApi(entity);
  }

  @Patch(':id')
  @Log()
  async update(@Param() { id }: ObjectIdDTO, @Body() dto: UpdateCrewmanDTO) {
    await this.useCases.update(id, dto);
  }
}
