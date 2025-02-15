import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Citas } from "./Citas";

@Entity("estados", { schema: "vetfolkbd" })
export class Estados {
  @PrimaryGeneratedColumn({ type: "int", name: "IdEstado" })
  idEstado: number;

  @Column("varchar", { name: "Estado", length: 50 })
  estado: string;

  @Column("text", { name: "Descripcion", nullable: true })
  descripcion: string | null;

  @OneToMany(() => Citas, (citas) => citas.idEstado2)
  citas: Citas[];
}
