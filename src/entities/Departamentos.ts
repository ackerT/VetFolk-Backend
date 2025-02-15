import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Municipios } from "./Municipios";

@Entity("departamentos", { schema: "vetfolkbd" })
export class Departamentos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdDepartamento" })
  idDepartamento: number;

  @Column("varchar", { name: "Departamento", length: 50 })
  departamento: string;

  @OneToMany(() => Municipios, (municipios) => municipios.idDepartamento2)
  municipios: Municipios[];
}
