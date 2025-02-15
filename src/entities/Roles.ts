import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";

@Entity("roles", { schema: "vetfolkbd" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "IdRol" })
  idRol: number;

  @Column("varchar", { name: "NombreRol", nullable: true, length: 50 })
  nombreRol: string | null;

  @Column("text", { name: "Descripcion", nullable: true })
  descripcion: string | null;

  @ManyToMany(() => Usuarios, (usuarios) => usuarios.roles)
  @JoinTable({
    name: "usuariosroles",
    joinColumns: [{ name: "IdRol", referencedColumnName: "idRol" }],
    inverseJoinColumns: [
      { name: "IdUsuario", referencedColumnName: "idUsuario" },
    ],
    schema: "vetfolkbd",
  })
  usuarios: Usuarios[];
}
