
export class CrearPersonaConRolDto {
    nombre1: string;
    nombre2: string;
    apellido1: string;
    apellido2: string;
    dni: string;
    fechaNac: string;
    telefono: string;
    correo: string;
    contrasena: string;
    idDireccion?: number; // Opcional
    idGenero?: number;    // Opcional
    idRol: number;        // El rol especificado en el body
  }
  