import { Controller, Get, Post, Body, Query, Param, Put, ParseIntPipe } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/createCita.dto';
import { Citas } from 'src/entities/Citas';
import { UpdateCitaDto } from 'src/dtos/UpdateCitaDto';
import { NotificacionesService } from 'src/notificacion/notificacion.service';

@Controller('citas')
export class CitasController {
    constructor(
      private readonly citastService: CitasService,
      private readonly notificacionesService: NotificacionesService, // Inyectamos el servicio de notificaciones

      
    ) {}

    @Post()
    async create(@Body() createCitaDto: CreateCitaDto) {
      const citaCreada = await this.citastService.create(createCitaDto);
  
      return citaCreada;
    }
  
    @Get('/obtener')
    findAll() {
      return this.citastService.obtenerCitas();
    }
  
    // Nueva ruta para verificar si ya existe una cita
    @Get('/verificar')
    async verificarCita(
      @Query('fecha') fecha: string,
      @Query('hora') hora: string,
      @Query('idServicio') idServicio: number,
    ): Promise<{ disponible: boolean }> {
      const disponible = await this.citastService.verificarDisponibilidad(fecha, hora, idServicio);
      return { disponible: !disponible };
    } 

    @Get('obtener/:idCita')
    async getCitaByID(@Param('idCita') idCita: string): Promise<Citas> {
      const citaId = parseInt(idCita); // Convertir el id a número
      return this.citastService.getCitaById(citaId);
    } 

    @Put("actualizar/:idCita")
  async update(
    @Param("idCita") idCita: number,
    @Body() updateCitaDto: UpdateCitaDto
  ): Promise<Citas> {
    const citaActualizada = await this.citastService.updateCita(idCita, updateCitaDto);
    return citaActualizada;
  }


  @Get('usuario/:idUsuario')
  async obtenerCitasPorUsuario(
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
  ): Promise<Citas[]> {
    return this.citastService.obtenerCitasPorUsuario(idUsuario);
  }
}
