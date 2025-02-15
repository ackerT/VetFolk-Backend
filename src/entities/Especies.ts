import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Mascotas } from "./Mascotas";
import { Razas } from "./Razas";

@Entity("especies", { schema: "vetfolkbd" })
export class Especies {
  @PrimaryGeneratedColumn({ type: "int", name: "IdEspecie" })
  idEspecie: number;

  @Column("varchar", { name: "NombreEspecie", length: 50 })
  nombreEspecie: string;

  @OneToMany(() => Mascotas, (mascotas) => mascotas.idEspecie2)
  mascotas: Mascotas[];

  @OneToMany(() => Razas, (razas) => razas.idEspecie2)
  razas: Razas[];
}
