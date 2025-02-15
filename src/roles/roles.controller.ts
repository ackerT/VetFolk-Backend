// src/controllers/RoleController.ts
import { Controller, Get, Put, Body, Param } from "@nestjs/common";
import { RoleService } from "./roles.service";
import { Roles } from "../entities/Roles";
import { AssignRoleDto } from "src/dtos/AsignarRolDto";
import { NotFoundException } from "@nestjs/common";

@Controller("roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(":idRol")
  async obtenerRol(@Param("idRol") idRol: number): Promise<Roles> {
    return this.roleService.obtenerRolPorId(idRol);
  }

  @Get()
  async findAll(): Promise<Roles[]> {
    return this.roleService.findAll();
  }


  @Put('assign/:idPersona')
  async assignRoleToPerson(
    @Param('idPersona') idPersona: number,
    @Body() AssignRoleDto : AssignRoleDto
  ) {
    const { idRol } = AssignRoleDto;  // Extraemos el idRol desde el body
    try {
      return await this.roleService.assignRoleToPerson(idPersona, idRol);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  } 

 
  


}
