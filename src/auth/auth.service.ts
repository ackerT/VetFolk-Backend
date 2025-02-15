import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Personas } from "../entities/Personas";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Personas) 
    private personaRepository: Repository<Personas>
  ) {}

  async login(correo: string, contrasena: string) {
    const persona = await this.personaRepository.findOne({
      where: { correo },
      relations: ["usuarios", "usuarios.roles"], 
    });

    if (!persona) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(contrasena, persona.contrasena);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const rol = persona.usuarios?.roles[0]?.nombreRol || "default";

    // Define la clave secreta directamente aquí
    const secretKey = "key"; 

    const token = jwt.sign(
      { userId: persona.idPersona, rol },
      secretKey, // Usamos la clave secreta directamente
      { expiresIn: "1h" }
    );

    return { token, rol };
  }
}
