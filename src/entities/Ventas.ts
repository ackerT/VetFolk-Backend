import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Facturas } from "./Facturas";
import { Personas } from "./Personas";
import { Ventasproductos } from "./Ventasproductos";

@Index("IdCliente", ["idCliente"], {})
@Entity("ventas", { schema: "vetfolkbd" })
export class Ventas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdVenta" })
  idVenta: number;

  @Column("int", { name: "IdCliente", nullable: true })
  idCliente: number | null;

  @Column("varchar", { name: "SerieFactura", nullable: true, length: 20 })
  serieFactura: string | null;

  @Column("date", { name: "Fecha", nullable: true })
  fecha: Date | null;

  @Column("decimal", { name: "Total", nullable: true, precision: 10, scale: 2 })
  total: string | null;

  @OneToMany(() => Facturas, (facturas) => facturas.idVenta2)
  facturas: Facturas[];

  @ManyToOne(() => Personas, (personas) => personas.ventas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdCliente", referencedColumnName: "idPersona" }])
  idCliente2: Personas;

  @OneToMany(
    () => Ventasproductos,
    (ventasproductos) => ventasproductos.idVenta2
  )
  ventasproductos: Ventasproductos[];
}
