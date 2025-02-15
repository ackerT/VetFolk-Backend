// src/modules/persona.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonaService } from "./personas.service";
import { PersonaController } from "./personas.controller";
import { Personas } from "../entities/Personas";
import { Usuarios } from "../entities/Usuarios";
import { Roles } from "../entities/Roles";
import { UsuarioService } from "../usuarios/usuarios.service";
import { RoleService } from "../roles/roles.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Personas, Usuarios, Roles]), // Importa entidades necesarias
  ],
  providers: [
    PersonaService,   // Proveedor para la lógica de Personas
    UsuarioService,   // Proveedor para la lógica de Usuarios
    RoleService,      // Proveedor para la lógica de Roles
  ],
  controllers: [PersonaController],
})
export class PersonaModule {}
