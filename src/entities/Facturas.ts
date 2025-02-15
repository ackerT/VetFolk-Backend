import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ventas } from "./Ventas";

@Index("IdVenta", ["idVenta"], {})
@Entity("facturas", { schema: "vetfolkbd" })
export class Facturas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdFactura" })
  idFactura: number;

  @Column("int", { name: "IdVenta", nullable: true })
  idVenta: number | null;

  @Column("varchar", { name: "NumeroFactura", nullable: true, length: 20 })
  numeroFactura: string | null;

  @Column("date", { name: "Fecha", nullable: true })
  fecha: Date | null;

  @Column("decimal", {
    name: "Subtotal",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  subtotal: string | null;

  @Column("decimal", { name: "ISV", nullable: true, precision: 10, scale: 2 })
  isv: string | null;

  @Column("decimal", { name: "Total", nullable: true, precision: 10, scale: 2 })
  total: string | null;

  @ManyToOne(() => Ventas, (ventas) => ventas.facturas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdVenta", referencedColumnName: "idVenta" }])
  idVenta2: Ventas;
}
