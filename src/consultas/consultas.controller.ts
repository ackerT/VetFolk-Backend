import { Controller, Post, Get, Body, Put, Param,  UseInterceptors, UploadedFiles} from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from 'src/dtos/CrearConsultaDto';
import { ParseIntPipe } from '@nestjs/common';
import { Consultas } from 'src/entities/Consultas';
import { UpdateConsultaDto } from 'src/dtos/UpdateConsultaDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';


@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

 
  @Post('crear')
  @UseInterceptors(FilesInterceptor('imagenes'))
  async createConsulta(
    @Body() createConsultaDto: CreateConsultaDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return await this.consultasService.createConsulta(createConsultaDto, files);
  }


  @Get('obtener')
  async findAll() {
    return await this.consultasService.findAllConsultas();
  }

  @Get('obtener/:idExpediente')
  async obtenerConsultasPorExpediente(
    @Param('idExpediente', ParseIntPipe) idExpediente: number,
  ) {
    return await this.consultasService.obtenerConsultasPorExpediente(idExpediente);
  } 

  @Get(':idExpediente')
  async getConsultasByExpedienteId(@Param('idExpediente') idExpediente: string) {
    return await this.consultasService.getConsultasByExpedienteId(Number(idExpediente));
  }

  @Put('actualizar/:idConsultas')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'imagenes', maxCount: 10 }])) // Permite múltiples imágenes
  async update(
    @Param('idConsultas') idConsultas: number,
    @Body() updateConsultaDto: UpdateConsultaDto,
    @UploadedFiles() files: { imagenes?: Express.Multer.File[] }
  ): Promise<Consultas> {
    if (files?.imagenes) {
      updateConsultaDto.imagenes = files.imagenes; // Asignar las imágenes al DTO
    }

    return this.consultasService.updateConsulta(idConsultas, updateConsultaDto);
  }

  @Get('getby/:idConsulta')
  async getConsultaById(@Param('idConsulta') idConsulta: number): Promise<Consultas> {
    return this.consultasService.getConsultaById(idConsulta);
  }
}

