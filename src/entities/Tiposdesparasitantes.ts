import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Registrosdesparasitaciones } from "./Registrosdesparasitaciones";

@Entity("tiposdesparasitantes", { schema: "vetfolkbd" })
export class Tiposdesparasitantes {
  @PrimaryGeneratedColumn({ type: "int", name: "IdTipoDes" })
  idTipoDes: number;

  @Column("varchar", { name: "NombreTipo", length: 50 })
  nombreTipo: string;

  @ManyToMany(
    () => Registrosdesparasitaciones,
    (registrosdesparasitaciones) =>
      registrosdesparasitaciones.tiposdesparasitantes
  )
  registrosdesparasitaciones: Registrosdesparasitaciones[];
}
