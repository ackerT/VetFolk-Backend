// src/services/usuario.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuarios } from "../entities/Usuarios";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuarios)
    private usuarioRepository: Repository<Usuarios>,
  ) {}

  // Método para obtener un usuario por su ID
  async obtenerUsuarioPorId(idUsuario: number): Promise<Usuarios | undefined> {
    return await this.usuarioRepository.findOne({
      where: { idUsuario },
      relations: ["roles"],
    });
  }

  // Método para obtener todos los usuarios
  async obtenerTodosLosUsuarios(): Promise<Usuarios[]> {
    return await this.usuarioRepository.find({ relations: ["roles"] });
  } 



}
