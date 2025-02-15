import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Consultas } from "./Consultas";
import { Mascotas } from "./Mascotas";
import { Registrosdesparasitaciones } from "./Registrosdesparasitaciones";
import { Registrosvacunas } from "./Registrosvacunas";

@Index("IdMascota", ["idMascota"], {})
@Entity("expedientes", { schema: "vetfolkbd" })
export class Expedientes {
  @PrimaryGeneratedColumn({ type: "int", name: "IdExpediente" })
  idExpediente: number;

  @Column("int", { name: "IdMascota" })
  idMascota: number;

  @Column("date", { name: "FechaApertura", nullable: true })
  fechaApertura: string | null;

  @Column("text", { name: "Alergias", nullable: true })
  alergias: string | null;

  @Column("text", { name: "CondicionesCronicas", nullable: true })
  condicionesCronicas: string | null;

  @Column("text", { name: "Observaciones", nullable: true })
  observaciones: string | null;

  @OneToMany(() => Consultas, (consultas) => consultas.idExpediente2)
  consultas: Consultas[];

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.expedientes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdMascota", referencedColumnName: "idMascota" }])
  idMascota2: Mascotas;

  @OneToMany(
    () => Registrosdesparasitaciones,
    (registrosdesparasitaciones) => registrosdesparasitaciones.idExpediente2
  )
  registrosdesparasitaciones: Registrosdesparasitaciones[];

  @OneToMany(
    () => Registrosvacunas,
    (registrosvacunas) => registrosvacunas.idExpediente2
  )
  registrosvacunas: Registrosvacunas[];
}
