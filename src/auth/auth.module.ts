// src/modules/AuthModule.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Personas } from "../entities/Personas";
import { Usuarios } from "../entities/Usuarios";
import { Roles } from "../entities/Roles";

@Module({
  imports: [TypeOrmModule.forFeature([Personas, Usuarios, Roles])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
