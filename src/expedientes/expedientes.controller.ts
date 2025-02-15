import { Body, Controller, Get, Post, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ExpedientesService } from './expedientes.service';
import { CreateExpedienteDto } from '../dtos/CrearExpedienteDto';
import { Expedientes } from '../entities/Expedientes';
import { UpdateExpedienteDto } from 'src/dtos/UpdateExpedienteDto';

@Controller('expedientes')
export class ExpedientesController {
  constructor(private readonly expedienteService: ExpedientesService) {}

  // Ruta para crear un expediente
  @Post('crear')
  async create(@Body() createExpedienteDto: CreateExpedienteDto): Promise<Expedientes> {
    return this.expedienteService.create(createExpedienteDto);
  }

  // Ruta para obtener todos los expedientes
  @Get('obtener')
  async findAll(): Promise<Expedientes[]> {
    return this.expedienteService.findAll();
  }

  @Get('obtener/:idExpediente')
  async obtenerConsultasPorExpediente(
    @Param('idExpediente', ParseIntPipe) idExpediente: number,
  ) {
    return await this.expedienteService.obtenerConsultasPorExpediente(idExpediente);
  }

  @Get(':idMascota')
  async getExpedientesByMascotaId(@Param('idMascota') idMascota: string) {
    return await this.expedienteService.getExpedientesByMascotaId(Number(idMascota));
  }

  @Get('find/:idExpediente')
  async findOne(@Param('idExpediente') idExpediente: number): Promise<Expedientes> {
    return await this.expedienteService.findOne(idExpediente);
  }

  @Put('actualizar/:idExpediente')
  async update(
    @Param('idExpediente') idExpediente: number,
    @Body() updateExpedienteDto: UpdateExpedienteDto,
  ): Promise<Expedientes> {
    return await this.expedienteService.update(idExpediente, updateExpedienteDto);
  }
}
