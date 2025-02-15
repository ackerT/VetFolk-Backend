import { Body, Controller, Post, Get, Put, Param, NotFoundException } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CrearMascotaDto } from '../dtos/CrearMascotaDto';
import { Mascotas } from '../entities/Mascotas';
import { UpdateMascotaDto } from 'src/dtos/UpdateMascotasDto';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post('crear')
  async create(@Body() createMascotaDto: CrearMascotaDto): Promise<Mascotas> {
    return this.mascotasService.create(createMascotaDto);
  }

   @Get('obtener')
    async getAllMascotas(): Promise<Mascotas[]> {
      return this.mascotasService.getAllMascotas();
    }

    @Get('obtenerexp')
    async findAllExp(): Promise<Mascotas[]> {
      return this.mascotasService.findAllExp();
    }

  
    @Put('act/:idMascota')
  async update(
    @Param('idMascota') idMascota: number,
    @Body() updateMascotaDto: UpdateMascotaDto,
  ): Promise<Mascotas> {
    try {
      return await this.mascotasService.update(idMascota, updateMascotaDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


  @Get('obtener/:idMascota')
  async findOne(@Param('idMascota') idMascota: number): Promise<Mascotas> {
    try {
      return await this.mascotasService.findById(idMascota);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
