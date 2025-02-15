import { Injectable } from '@nestjs/common';
import { Estados } from 'src/entities/Estados'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EstadosService {
    constructor(
        @InjectRepository(Estados)
        private estadosRepository: Repository<Estados>,
      ) {}

    

      async getAllEstados():Promise<Estados[]>{
        const estados = await this.estadosRepository.find();
        return estados;
      }

}
