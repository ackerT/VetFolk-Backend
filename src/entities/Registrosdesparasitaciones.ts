import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tiposdesparasitantes } from "./Tiposdesparasitantes";
import { Expedientes } from "./Expedientes";
import { Personas } from "./Personas";

@Index("IdExpediente", ["idExpediente"], {})
@Index("IdVeterinario", ["idVeterinario"], {})
@Entity("registrosdesparasitaciones", { schema: "vetfolkbd" })
export class Registrosdesparasitaciones {
  @PrimaryGeneratedColumn({ type: "int", name: "IdRegDes" })
  idRegDes: number;

  @Column("int", { name: "IdExpediente", nullable: true })
  idExpediente: number | null;

  @Column("int", { name: "IdVeterinario", nullable: true })
  idVeterinario: number | null;

  @Column("int", { name: "IdMarcaDesparasitante", nullable: true })
  idMarcaDesparasitante: number | null;

  @Column("date", { name: "FechaDesparasitante" })
  fechaDesparasitante: string;

  @Column("date", { name: "ProximaDosis" })
  proximaDosis: string;

  @Column("text", { name: "Observaciones", nullable: true })
  observaciones: string | null;

  @ManyToMany(
    () => Tiposdesparasitantes,
    (tiposdesparasitantes) => tiposdesparasitantes.registrosdesparasitaciones
  )
  @JoinTable({
    name: "desparasitantestipos",
    joinColumns: [{ name: "IdRegDes", referencedColumnName: "idRegDes" }],
    inverseJoinColumns: [
      { name: "IdTipoDes", referencedColumnName: "idTipoDes" },
    ],
    schema: "vetfolkbd",
  })
  tiposdesparasitantes: Tiposdesparasitantes[];

  @ManyToOne(
    () => Expedientes,
    (expedientes) => expedientes.registrosdesparasitaciones,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "IdExpediente", referencedColumnName: "idExpediente" }])
  idExpediente2: Expedientes;

  @ManyToOne(
    () => Personas,
    (personas) => personas.registrosdesparasitaciones,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "IdVeterinario", referencedColumnName: "idPersona" }])
  idVeterinario2: Personas;
}
