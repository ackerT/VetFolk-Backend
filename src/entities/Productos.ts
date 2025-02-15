import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categorias } from "./Categorias";
import { Ventasproductos } from "./Ventasproductos";

@Index("IdCategoria", ["idCategoria"], {})
@Entity("productos", { schema: "vetfolkbd" })
export class Productos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdProducto" })
  idProducto: number;

  @Column("int", { name: "IdCategoria", nullable: true })
  idCategoria: number | null;

  @Column("varchar", { name: "Nombre", length: 100 })
  nombre: string;

  @Column("text", { name: "Descripcion", nullable: true })
  descripcion: string | null;

  @Column("decimal", { name: "Precio", nullable: true, precision: 8, scale: 2 })
  precio: string | null;

  @Column("int", { name: "Stock" })
  stock: number;

  @Column("varchar", { name: "ImagenURL", nullable: true, length: 255 })
  imagenUrl: string | null;

  @ManyToOne(() => Categorias, (categorias) => categorias.productos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdCategoria", referencedColumnName: "idCategoria" }])
  idCategoria2: Categorias;

  @OneToMany(
    () => Ventasproductos,
    (ventasproductos) => ventasproductos.idProducto2
  )
  ventasproductos: Ventasproductos[];
}
