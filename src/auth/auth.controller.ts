// src/controllers/AuthController.ts
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "../dtos/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const { correo, contrasena } = loginDto;
    return await this.authService.login(correo, contrasena);
  }
}
