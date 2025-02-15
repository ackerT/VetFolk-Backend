// src/services/PersonaService.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Personas } from "../entities/Personas";
import { Usuarios } from "../entities/Usuarios";
import { RoleService } from "../roles/roles.service";
import * as bcrypt from "bcrypt";
import { CrearPersonaRolPredeterminadoDto } from "../dtos/CrearPersonaRolPredeterminadoDto";
import { CrearPersonaConRolDto } from "../dtos/CrearPersonaConRolDto";
import { UpdatePersonaDto } from "../dtos/UpdatePersonaDto"; 
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from "@nestjs/common"; 
import { Roles } from "src/entities/Roles"; 
import { Like } from "typeorm"; 
import { In } from "typeorm";
import { GetPersonasWithRolesDto } from "src/dtos/GetPersonaConRolDto";


@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Personas)
    private personaRepository: Repository<Personas>,

    @InjectRepository(Usuarios)
    private usuarioRepository: Repository<Usuarios>,

    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
   
    private roleService: RoleService
  ) {}

  // Método para crear persona con rol predeterminado (idRol = 1)
  async crearPersonaConRolPredeterminado(data: CrearPersonaRolPredeterminadoDto) {
    const { contrasena, ...personaData } = data;

    const persona = this.personaRepository.create(personaData);
    persona.contrasena = await bcrypt.hash(contrasena, 10);
    await this.personaRepository.save(persona);

    const usuario = new Usuarios();
    usuario.idUsuario = persona.idPersona;
    usuario.fechaRegistro = new Date();

    const rol = await this.roleService.obtenerRolPorId(1); // Rol predeterminado con id = 1
    if (!rol) throw new Error("Rol predeterminado no encontrado");

    usuario.roles = [rol];
    await this.usuarioRepository.save(usuario);

    return { persona, usuario };
  }

  // Método para crear persona con rol específico
  async crearPersonaConRol(data: CrearPersonaConRolDto) {
    const { idRol, contrasena, ...personaData } = data;

    const persona = this.personaRepository.create(personaData);
    persona.contrasena = await bcrypt.hash(contrasena, 10);
    await this.personaRepository.save(persona);

    const usuario = new Usuarios();
    usuario.idUsuario = persona.idPersona;
    usuario.fechaRegistro = new Date();

    const rol = await this.roleService.obtenerRolPorId(idRol);
    if (!rol) throw new Error("Rol especificado no encontrado");

    usuario.roles = [rol];
    await this.usuarioRepository.save(usuario);

    return { persona, usuario };
  }

  // Actualizar los datos de una persona
  async actualizarDatosPersona(idPersona: number, updatePersonaDto: UpdatePersonaDto) {
    // Buscar la persona
    const persona = await this.personaRepository.findOne({ where: { idPersona } });
    if (!persona) {
      throw new Error("Persona no encontrada");
    }

    // Actualizar los campos de la persona
    Object.assign(persona, updatePersonaDto);

    // Guardar la persona con los nuevos datos
    return await this.personaRepository.save(persona);
  }

  // Cambiar la contraseña de la persona
  async cambiarContrasena(idPersona: number, contrasenaActual: string, contrasenaNueva: string) {
    const persona = await this.personaRepository.findOne({ where: { idPersona } });
    if (!persona) {
      throw new Error("Persona no encontrada");
    }

    const isMatch = await bcrypt.compare(contrasenaActual, persona.contrasena);
    if (!isMatch) {
      throw new Error("Contraseña actual incorrecta");
    }

    // Encriptar la nueva contraseña
    persona.contrasena = await bcrypt.hash(contrasenaNueva, 10);

    // Guardar la nueva contraseña
    return await this.personaRepository.save(persona);
  }


  // Obtener persona por ID
  async getAllPersonas(): Promise<Personas[]> {
    const personas = await this.personaRepository.find();

    return personas;
  } 


    // Obtener persona por ID
    async getPersonaById(idPersona: number): Promise<Personas> {
        const persona = await this.personaRepository.findOne({
          where: { idPersona },
        });
    
        if (!persona) {
          throw new NotFoundException(`Persona con id ${idPersona} no encontrada`);
        }
    
        return persona;
      }
      async buscarPorNombreConMascotas(nombre: string): Promise<Personas[]> {
        return this.personaRepository.find({
          where: [
            { nombre1: Like(`%${nombre}%`) },
          ],
          relations: ['mascotas'], // Incluir la relación con las mascotas
        });
      }
      async getAllPersonasUs(): Promise<Personas[]> {
        const personas = await this.personaRepository.find( { relations: ["usuarios"] });
    
        return personas;
      }  

      async findAllWithRoles(): Promise<GetPersonasWithRolesDto[]> {
        // Obtienes todas las personas con sus usuarios y roles
        const personas = await this.personaRepository.find({
          relations: ['usuarios', 'usuarios.roles'],
        });
    
        // Mapear las personas a un formato más simple para la respuesta
        return personas.map(persona => {
          const roles = persona.usuarios?.roles?.map(role => role.nombreRol) || []; // Asegurarse de que roles no sea null
    
          return {
            idPersona: persona.idPersona,
            nombre1: persona.nombre1,
            apellido1: persona.apellido1,
            correo: persona.correo,
            telefono: persona.telefono,
            roles: roles, // Roles asociados a la persona, si existen
          };
        });
      }


      async updateRole(idPersona: number, idRol: number) {
        // Buscamos la persona por su idPersona
        const persona = await this.personaRepository.findOne({
          where: { idPersona },
          relations: ['usuarios'],
        });
    
        if (!persona) {
          throw new NotFoundException(`Persona con ID ${idPersona} no encontrada`);
        }
    
        // Obtenemos el usuario asociado a la persona
        const usuario = persona.usuarios;
        if (!usuario) {
          throw new NotFoundException(`Usuario para la persona ${idPersona} no encontrado`);
        }
    
        // Buscamos el rol que se asignará
        const role = await this.rolesRepository.findOne({ where: { idRol } });
    
        if (!role) {
          throw new NotFoundException(`Rol con ID ${idRol} no encontrado`);
        }
    
        // Asignamos el nuevo rol al usuario
        usuario.roles = [role]; // Si deseas reemplazar los roles existentes
    
        // Guardamos el usuario con su nuevo rol
        await this.usuarioRepository.save(usuario);
    
        return {
          message: `Rol actualizado correctamente para la persona con ID ${idPersona}`,
          roles: usuario.roles.map(role => role.nombreRol),
        };
      }

     
}