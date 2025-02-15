import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Personas } from "./Personas";

@Index("IdPersona", ["idPersona"], {})
@Entity("personal", { schema: "vetfolkbd" })
export class Personal {
  @PrimaryGeneratedColumn({ type: "int", name: "IdPersonal" })
  idPersonal: number;

  @Column("int", { name: "IdPersona" })
  idPersona: number;

  @Column("varchar", { name: "Titulo", length: 50 })
  titulo: string;

  @Column("varchar", { name: "Puesto", length: 50 })
  puesto: string;

  @Column("text", { name: "Descripcion" })
  descripcion: string;

  @Column("varchar", { name: "ImagenURL", nullable: true, length: 255 })
  imagenUrl: string | null;

  @ManyToOne(() => Personas, (personas) => personas.personals, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdPersona", referencedColumnName: "idPersona" }])
  idPersona2: Personas;
}
