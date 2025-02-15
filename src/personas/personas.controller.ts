// src/controllers/PersonaController.ts
import { Body, Controller, Post, Put, Param, Get } from "@nestjs/common";
import { PersonaService } from "./personas.service";
import { CrearPersonaRolPredeterminadoDto } from "../dtos/CrearPersonaRolPredeterminadoDto";
import { CrearPersonaConRolDto } from "../dtos/CrearPersonaConRolDto";
import { UpdatePersonaDto } from "../dtos/UpdatePersonaDto";
import { Personas } from "../entities/Personas";
import { AssignRoleDto } from "src/dtos/AsignarRolDto";
import { NotFoundException } from "@nestjs/common";
import { Query } from "@nestjs/common";
import { GetPersonasWithRolesDto } from "src/dtos/GetPersonaConRolDto";

@Controller("personas")
export class PersonaController {
  constructor(private personaService: PersonaService) {}

  // Endpoint para crear persona con rol predeterminado (idRol = 1)
  @Post("crear")
  async crearPersonaConRolPredeterminado(
    @Body() data: CrearPersonaRolPredeterminadoDto
  ) {
    return await this.personaService.crearPersonaConRolPredeterminado(data);
  }

  // Endpoint para crear persona con rol especificado en el body
  @Post("crearrol")
  async crearPersonaConRol(@Body() data: CrearPersonaConRolDto) {
    return await this.personaService.crearPersonaConRol(data);
  } 

  // Ruta para actualizar los datos de una persona
  @Put('actualizar/:idPersona')
  async actualizarDatosPersona(
    @Param('idPersona') idPersona: number,
    @Body() updatePersonaDto: UpdatePersonaDto
  ) {
    return await this.personaService.actualizarDatosPersona(idPersona, updatePersonaDto);
  }

  // Ruta para cambiar la contraseña
  @Put(':idPersona/cambiar-contrasena')
  async cambiarContrasena(
    @Param('idPersona') idPersona: number,
    @Body() { contrasenaActual, contrasenaNueva }: { contrasenaActual: string; contrasenaNueva: string }
  ) {
    return await this.personaService.cambiarContrasena(idPersona, contrasenaActual, contrasenaNueva);
  }

 


    // Endpoint para obtener una persona por ID
    @Get('obtener/:idPersona')
    async getPersona(@Param('idPersona') idPersona: string): Promise<Personas> {
      const personaId = parseInt(idPersona); // Convertir el id a número
      return this.personaService.getPersonaById(personaId);
    }
  
    // Endpoint para obtener todas las personas
    @Get('obtener')
    async getAllPersonas(): Promise<Personas[]> {
      return this.personaService.getAllPersonas();
    } 

    @Get('buscar')
  async buscarPorNombre(@Query('nombre') nombre: string) {
    return this.personaService.buscarPorNombreConMascotas(nombre);
  }

  @Get('obtenerus')
  async getAllPersonasSs(): Promise<Personas[]> {
    return this.personaService.getAllPersonasUs();
  } 


  @Get('conroles')
  async findAllWithRoles(): Promise<GetPersonasWithRolesDto[]> {
    return this.personaService.findAllWithRoles();
  }

  @Put(':idPersona/actrol')
  async updateRole(
    @Param('idPersona') idPersona: number, // parámetro en la URL
    @Body() body: { idRol: number }, // directamente el cuerpo
  ) {
    return this.personaService.updateRole(idPersona, body.idRol);
  }
} 

