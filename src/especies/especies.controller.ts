import { Controller, Get } from '@nestjs/common';
import { Especies } from 'src/entities/Especies';
import { EspeciesService } from './especies.service';

@Controller('especies')
export class EspeciesController {
    constructor(private readonly especiesService: EspeciesService) {}



    @Get('obtener')
    async getAllEspecies2(): Promise<Especies[]> {
      return this.especiesService.getAllEspecies();
    }
}
