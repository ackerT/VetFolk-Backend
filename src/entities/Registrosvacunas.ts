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
import { Expedientes } from "./Expedientes";
import { Personas } from "./Personas";
import { Tiposvacunas } from "./Tiposvacunas";

@Index("IdExpediente", ["idExpediente"], {})
@Index("IdVeterinario", ["idVeterinario"], {})
@Entity("registrosvacunas", { schema: "vetfolkbd" })
export class Registrosvacunas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdRegVac" })
  idRegVac: number;

  @Column("int", { name: "IdExpediente", nullable: true })
  idExpediente: number | null;

  @Column("int", { name: "IdVeterinario", nullable: true })
  idVeterinario: number | null;

  @Column("int", { name: "IdMarcaVacuna", nullable: true })
  idMarcaVacuna: number | null;

  @Column("date", { name: "FechaVacuna" })
  fechaVacuna: string;

  @Column("date", { name: "ProximaDosis" })
  proximaDosis: string;

  @Column("text", { name: "Observaciones", nullable: true })
  observaciones: string | null;

  @ManyToOne(() => Expedientes, (expedientes) => expedientes.registrosvacunas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdExpediente", referencedColumnName: "idExpediente" }])
  idExpediente2: Expedientes;

  @ManyToOne(() => Personas, (personas) => personas.registrosvacunas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdVeterinario", referencedColumnName: "idPersona" }])
  idVeterinario2: Personas;

  @ManyToMany(
    () => Tiposvacunas,
    (tiposvacunas) => tiposvacunas.registrosvacunas
  )
  @JoinTable({
    name: "vacunastipos",
    joinColumns: [{ name: "IdRegVac", referencedColumnName: "idRegVac" }],
    inverseJoinColumns: [
      { name: "IdTipoVac", referencedColumnName: "idTipoVac" },
    ],
    schema: "vetfolkbd",
  })
  tiposvacunas: Tiposvacunas[];
}
