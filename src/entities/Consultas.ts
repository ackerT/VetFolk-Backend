import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Expedientes } from "./Expedientes";
import { Personas } from "./Personas";
import { Citas } from "./Citas";

@Index("IdExpediente", ["idExpediente"], {})
@Index("IdVeterinario", ["idVeterinario"], {})
@Index("IdCita", ["idCita"], {})
@Entity("consultas", { schema: "vetfolkbd" })
export class Consultas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdConsultas" })
  idConsultas: number;

  @Column("int", { name: "IdExpediente", nullable: true })
  idExpediente: number | null;

  @Column("int", { name: "IdVeterinario", nullable: true })
  idVeterinario: number | null;

  @Column("int", { name: "IdCita", nullable: true })
  idCita: number | null;

  @Column("date", { name: "FechaConsulta" })
  fechaConsulta: string;

  @Column("text", { name: "MotivoConsulta" })
  motivoConsulta: string;

  @Column("text", { name: "Diagnostico" })
  diagnostico: string;

  @Column("text", { name: "Tratamiento" })
  tratamiento: string;

  @Column("text", { name: "Observaciones", nullable: true })
  observaciones: string | null;

  @Column("simple-array", { name: "Imagenes", nullable: true })
  imagenes: string[] | null;

  @ManyToOne(() => Expedientes, (expedientes) => expedientes.consultas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdExpediente", referencedColumnName: "idExpediente" }])
  idExpediente2: Expedientes;

  @ManyToOne(() => Personas, (personas) => personas.consultas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdVeterinario", referencedColumnName: "idPersona" }])
  idVeterinario2: Personas;

  @ManyToOne(() => Citas, (citas) => citas.consultas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdCita", referencedColumnName: "idCita" }])
  idCita2: Citas;
}
