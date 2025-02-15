import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Mascotas } from "./Mascotas";
import { Personas } from "./Personas";

@Entity("generos", { schema: "vetfolkbd" })
export class Generos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdGenero" })
  idGenero: number;

  @Column("varchar", { name: "Genero", length: 20 })
  genero: string;

  @OneToMany(() => Mascotas, (mascotas) => mascotas.idGenero2)
  mascotas: Mascotas[];

  @OneToMany(() => Personas, (personas) => personas.idGenero2)
  personas: Personas[];
}
