import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";
import { Estados } from "./Estados";
import { Servicios } from "./Servicios";
import { Consultas } from "./Consultas";

@Index("IdUsuario", ["idUsuario"], {})
@Index("IdEstado", ["idEstado"], {})
@Index("IdServicio", ["idServicio"], {})
@Entity("citas", { schema: "vetfolkbd" })
export class Citas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdCita" })
  idCita: number;

  @Column("int", { name: "IdUsuario", nullable: true })
  idUsuario: number | null;

  @Column("int", { name: "IdEstado", nullable: true })
  idEstado: number | null;

  @Column("int", { name: "IdServicio", nullable: true })
  idServicio: number | null;

  @Column("varchar", { name: "NombreMascota", nullable: true, length: 25 })
  nombreMascota: string | null;

  @Column("date", { name: "Fecha", nullable: true })
  fecha: string | null;

  @Column("time", { name: "Hora", nullable: true })
  hora: string | null;

  @Column("text", { name: "Comentarios", nullable: true })
  comentarios: string | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.citas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdUsuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuarios;

  @ManyToOne(() => Estados, (estados) => estados.citas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdEstado", referencedColumnName: "idEstado" }])
  idEstado2: Estados;

  @ManyToOne(() => Servicios, (servicios) => servicios.citas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdServicio", referencedColumnName: "idServicio" }])
  idServicio2: Servicios;

  @OneToMany(() => Consultas, (consultas) => consultas.idCita2)
  consultas: Consultas[];
}
