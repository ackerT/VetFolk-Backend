import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Direcciones } from "./Direcciones";
import { Departamentos } from "./Departamentos";

@Index("IdDepartamento", ["idDepartamento"], {})
@Entity("municipios", { schema: "vetfolkbd" })
export class Municipios {
  @PrimaryGeneratedColumn({ type: "int", name: "IdMunicipio" })
  idMunicipio: number;

  @Column("int", { name: "IdDepartamento" })
  idDepartamento: number;

  @Column("varchar", { name: "Municipio", length: 50 })
  municipio: string;

  @OneToMany(() => Direcciones, (direcciones) => direcciones.idMunicipio2)
  direcciones: Direcciones[];

  @ManyToOne(() => Departamentos, (departamentos) => departamentos.municipios, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "IdDepartamento", referencedColumnName: "idDepartamento" },
  ])
  idDepartamento2: Departamentos;
}
