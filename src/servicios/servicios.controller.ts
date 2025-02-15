import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Put, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ServiciosService } from './servicios.service';
import { BadRequestException } from '@nestjs/common';
import { Servicios } from 'src/entities/Servicios';


@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService, 
    
  ) {}

  // Método para obtener todos los servicios
  @Get()
  findAll() {
    return this.serviciosService.findAll();
  }
  @Post('crear')
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return this.serviciosService.createServicio(body, file);
  }

  @Put('editar/:id')
  @UseInterceptors(FileInterceptor('file')) // Usar interceptor para manejar el archivo
  async updateServicio(
    @Param('id') id: number, 
    @Body() data: any, 
    @UploadedFile() file: Express.Multer.File
  ): Promise<Servicios> {
    return this.serviciosService.updateServicio(id, data, file);
  }

  // Eliminar un servicio
  @Delete('eliminar/:id')
  async deleteServicio(@Param('id') id: number): Promise<void> {
    return this.serviciosService.deleteServicio(id);
  }

 
}