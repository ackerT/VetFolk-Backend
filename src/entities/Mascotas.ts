import {
  Column,
  Decimal128,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Expedientes } from "./Expedientes";
import { Personas } from "./Personas";
import { Especies } from "./Especies";
import { Razas } from "./Razas";
import { Generos } from "./Generos";

@Index("IdEspecie", ["idEspecie"], {})
@Index("IdGenero", ["idGenero"], {})
@Index("IdPropietario", ["idPropietario"], {})
@Index("IdRaza", ["idRaza"], {})
@Entity("mascotas", { schema: "vetfolkbd" })
export class Mascotas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdMascota" })
  idMascota: number;

  @Column("int", { name: "IdPropietario", nullable: true })
  idPropietario: number | null;

  @Column("int", { name: "IdEspecie", nullable: true })
  idEspecie: number | null;

  @Column("int", { name: "IdRaza", nullable: true })
  idRaza: number | null;

  @Column("int", { name: "IdGenero", nullable: true })
  idGenero: number | null;

  @Column("varchar", { name: "NombreMascota", length: 50 })
  nombreMascota: string;

  @Column("int", { name: "Edad", nullable: true })
  edad: number | null;

  @Column("decimal", { name: "Peso", nullable: true, precision: 5, scale: 2 })
  peso: Decimal128 | null;

  @Column("tinyint", { name: "Agresiva", nullable: true, width: 1 })
  agresiva: boolean | null;

  @Column("tinyint", { name: "Esterilizada", nullable: true, width: 1 })
  esterilizada: boolean | null;

  @Column("text", { name: "Observaciones", nullable: true })
  observaciones: string | null;

  @Column("date", { name: "FechaNacimiento", nullable: true })
  fechaNacimiento: Date | null;

  @OneToMany(() => Expedientes, (expedientes) => expedientes.idMascota2)
  expedientes: Expedientes[];

  @ManyToOne(() => Personas, (personas) => personas.mascotas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdPropietario", referencedColumnName: "idPersona" }])
  idPropietario2: Personas;

  @ManyToOne(() => Especies, (especies) => especies.mascotas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdEspecie", referencedColumnName: "idEspecie" }])
  idEspecie2: Especies;

  @ManyToOne(() => Razas, (razas) => razas.mascotas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdRaza", referencedColumnName: "idRaza" }])
  idRaza2: Razas;

  @ManyToOne(() => Generos, (generos) => generos.mascotas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdGenero", referencedColumnName: "idGenero" }])
  idGenero2: Generos;
}
