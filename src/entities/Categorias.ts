import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productos } from "./Productos";

@Entity("categorias", { schema: "vetfolkbd" })
export class Categorias {
  @PrimaryGeneratedColumn({ type: "int", name: "IdCategoria" })
  idCategoria: number;

  @Column("varchar", { name: "NombreCategoria", length: 50 })
  nombreCategoria: string;

  @Column("text", { name: "Descripcion" })
  descripcion: string;

  @OneToMany(() => Productos, (productos) => productos.idCategoria2)
  productos: Productos[];
}
