import { Controller } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { Get } from '@nestjs/common';
import { Estados } from 'src/entities/Estados';

@Controller('estados')
export class EstadosController {
    constructor(private readonly estadosService: EstadosService) {} 

    @Get('obtener')
    async getAllEstados(): Promise<Estados[]> {
      return this.estadosService.getAllEstados();
    }
}
