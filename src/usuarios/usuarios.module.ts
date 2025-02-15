// src/modules/usuario.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioService } from "./usuarios.service";
import { UsuarioController } from "./usuarios.controller";
import { Usuarios } from "../entities/Usuarios";

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
