import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal } from 'src/entities/Personal';

@Module({
  imports: [TypeOrmModule.forFeature([Personal])],
  providers: [PersonalService],
  controllers: [PersonalController]
})
export class PersonalModule {}
