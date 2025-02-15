import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipios } from "./Municipios";
import { Personas } from "./Personas";

@Index("IdMunicipio", ["idMunicipio"], {})
@Entity("direcciones", { schema: "vetfolkbd" })
export class Direcciones {
  @PrimaryGeneratedColumn({ type: "int", name: "IdDireccion" })
  idDireccion: number;

  @Column("int", { name: "IdMunicipio", nullable: true })
  idMunicipio: number | null;

  @Column("varchar", { name: "Barrio", length: 100 })
  barrio: string;

  @Column("varchar", { name: "Referencias", nullable: true, length: 200 })
  referencias: string | null;

  @ManyToOne(() => Municipios, (municipios) => municipios.direcciones, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdMunicipio", referencedColumnName: "idMunicipio" }])
  idMunicipio2: Municipios;

  @OneToMany(() => Personas, (personas) => personas.idDireccion2)
  personas: Personas[];
}
