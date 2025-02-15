import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Especies } from 'src/entities/Especies';
import { Repository } from 'typeorm';

@Injectable()
export class EspeciesService {
    constructor(
        @InjectRepository(Especies)
        private especiesRepository: Repository<Especies>,
      ) {}

      async getAllEspecies(): Promise<Especies[]> {
        const mascotas = await this.especiesRepository.find();
        return mascotas;
      } 
    
}
