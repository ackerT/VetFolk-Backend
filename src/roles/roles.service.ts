// src/roles/roles.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Roles } from "src/entities/Roles";
import { Personas } from "src/entities/Personas";
import { Usuarios } from "src/entities/Usuarios";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,

    @InjectRepository(Personas)
    private personaRepository: Repository<Personas>,

    @InjectRepository(Usuarios)
    private usuarioRepository: Repository<Usuarios>,
  ) {}

  async obtenerRolPorId(id: number): Promise<Roles | undefined> {
    return this.roleRepository.findOne({ where: { idRol: id } });
  } 


  async findAll(): Promise<Roles[]> {
    return this.roleRepository.find();
  }
  

  async assignRoleToPerson(idPersona: number, idRol: number): Promise<any> {
    // Verificar que la persona exista
    const persona = await this.personaRepository.findOne({
      where: { idPersona },
    });
    if (!persona) {
      throw new NotFoundException(`Persona con ID ${idPersona} no encontrada`);
    }

    // Buscar el usuario asociado a la persona
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario: persona.idPersona },
      relations: ['roles'], // Asegurarnos de cargar los roles asociados al usuario
    });
    if (!usuario) {
      throw new NotFoundException(
        `Usuario asociado a la persona con ID ${idPersona} no encontrado`,
      );
    }

    // Verificar que el rol exista
    const rol = await this.roleRepository.findOne({
      where: { idRol: idRol },
    });
    if (!rol) {
      throw new NotFoundException(`Rol con ID ${idRol} no encontrado`);
    }

    // Verificar si el rol ya está asignado al usuario
    const existingRole = usuario.roles.find((role) => role.idRol === idRol);
    if (existingRole) {
      throw new Error(`El rol con ID ${idRol} ya está asignado al usuario.`);
    }

    // Asignar el rol al usuario
    usuario.roles.push(rol); // Tipo de relación ManyToMany, agregamos el rol al usuario

    // Guardar el usuario con el nuevo rol asignado
    await this.usuarioRepository.save(usuario);

    return {
      message: `El rol con ID ${idRol} ha sido asignado correctamente al usuario con ID ${usuario.idUsuario}`,
    };
  }

 
}
