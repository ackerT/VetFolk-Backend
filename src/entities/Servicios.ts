import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Citas } from "./Citas";

@Entity("servicios", { schema: "vetfolkbd" })
export class Servicios {
  @PrimaryGeneratedColumn({ type: "int", name: "IdServicio" })
  idServicio: number;

  @Column("varchar", { name: "TipoServicio", length: 50 })
  tipoServicio: string;

  @Column("text", { name: "Descripcion", nullable: true })
  descripcion: string | null;

  @Column("decimal", { name: "Precio", nullable: true, precision: 8, scale: 2 })
  precio: string | null;

  @Column("text", { name: "Detalles", nullable: true })
  detalles: string | null;

  @Column("varchar", { name: "ImagenURL", nullable: true, length: 255 })
  imagenUrl: string | null;

  @OneToMany(() => Citas, (citas) => citas.idServicio2)
  citas: Citas[];
}
