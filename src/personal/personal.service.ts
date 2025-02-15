import { Injectable } from '@nestjs/common';
import { Personal } from 'src/entities/Personal';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonalService {
    constructor(
        @InjectRepository(Personal)
        private personalRepository: Repository<Personal>,
      ) {}
    
      findAll(): Promise<Personal[]> {
        return this.personalRepository.find();
      }
}
