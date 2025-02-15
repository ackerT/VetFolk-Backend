import { Controller, Get } from '@nestjs/common';
import { PersonalService } from './personal.service';

@Controller('personal')
export class PersonalController {
    constructor(private readonly personalService: PersonalService) {}

    @Get('/obtener')
    findAll() {
      return this.personalService.findAll();
    }
}
