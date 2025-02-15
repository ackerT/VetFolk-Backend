import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ventas } from "./Ventas";
import { Productos } from "./Productos";

@Index("IdVenta", ["idVenta"], {})
@Index("IdProducto", ["idProducto"], {})
@Entity("ventasproductos", { schema: "vetfolkbd" })
export class Ventasproductos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdVentasProductos" })
  idVentasProductos: number;

  @Column("int", { name: "IdVenta", nullable: true })
  idVenta: number | null;

  @Column("int", { name: "IdProducto", nullable: true })
  idProducto: number | null;

  @Column("int", { name: "Cantidad", nullable: true })
  cantidad: number | null;

  @Column("decimal", {
    name: "PrecioUnitario",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  precioUnitario: string | null;

  @ManyToOne(() => Ventas, (ventas) => ventas.ventasproductos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdVenta", referencedColumnName: "idVenta" }])
  idVenta2: Ventas;

  @ManyToOne(() => Productos, (productos) => productos.ventasproductos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdProducto", referencedColumnName: "idProducto" }])
  idProducto2: Productos;
}
