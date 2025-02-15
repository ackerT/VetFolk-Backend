// src/controllers/usuario.controller.ts
import { Controller, Get, Param } from "@nestjs/common";
import { UsuarioService } from "./usuarios.service";
import { Usuarios } from "../entities/Usuarios";

@Controller("usuarios")
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  // Endpoint para obtener un usuario por su ID
  @Get(":id")
  async obtenerUsuarioPorId(@Param("id") id: number): Promise<Usuarios> {
    return await this.usuarioService.obtenerUsuarioPorId(id);
  }

  // Endpoint para obtener todos los usuarios
  @Get()
  async obtenerTodosLosUsuarios(): Promise<Usuarios[]> {
    return await this.usuarioService.obtenerTodosLosUsuarios();
  } 



}
