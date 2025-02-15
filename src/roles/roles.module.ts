// src/modules/RoleModule.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleService } from "./roles.service";
import { RoleController } from "./roles.controller";
import { Roles } from "../entities/Roles";
import { Usuarios } from "src/entities/Usuarios";
import { Personas } from "src/entities/Personas";

@Module({
  imports: [TypeOrmModule.forFeature([Roles, Usuarios, Personas])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
