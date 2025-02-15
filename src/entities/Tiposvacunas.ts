import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Registrosvacunas } from "./Registrosvacunas";

@Entity("tiposvacunas", { schema: "vetfolkbd" })
export class Tiposvacunas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdTipoVac" })
  idTipoVac: number;

  @Column("varchar", { name: "NombreTipo", length: 50 })
  nombreTipo: string;

  @ManyToMany(
    () => Registrosvacunas,
    (registrosvacunas) => registrosvacunas.tiposvacunas
  )
  registrosvacunas: Registrosvacunas[];
}
