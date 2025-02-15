import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Mascotas } from "./Mascotas";
import { Especies } from "./Especies";

@Index("IdEspecie", ["idEspecie"], {})
@Entity("razas", { schema: "vetfolkbd" })
export class Razas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdRaza" })
  idRaza: number;

  @Column("int", { name: "IdEspecie" })
  idEspecie: number;

  @Column("varchar", { name: "NombreRaza", length: 50 })
  nombreRaza: string;

  @OneToMany(() => Mascotas, (mascotas) => mascotas.idRaza2)
  mascotas: Mascotas[];

  @ManyToOne(() => Especies, (especies) => especies.razas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdEspecie", referencedColumnName: "idEspecie" }])
  idEspecie2: Especies;
}
