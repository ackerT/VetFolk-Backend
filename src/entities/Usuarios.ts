import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Citas } from "./Citas";
import { Personas } from "./Personas";
import { Roles } from "./Roles";
import { Notificacion } from "./Notificacion";

@Entity("usuarios", { schema: "vetfolkbd" })
export class Usuarios {
  @Column("int", { primary: true, name: "IdUsuario" })
  idUsuario: number;

  @Column("date", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @OneToMany(() => Citas, (citas) => citas.idUsuario2)
  citas: Citas[];

  @OneToOne(() => Personas, (personas) => personas.usuarios, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdUsuario", referencedColumnName: "idPersona" }])
  idUsuario2: Personas;

  @ManyToMany(() => Roles, (roles) => roles.usuarios)
  roles: Roles[];

  @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
  notificacion: Notificacion[]; 
}
