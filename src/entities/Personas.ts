import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Consultas } from "./Consultas";
import { Mascotas } from "./Mascotas";
import { Personal } from "./Personal";
import { Direcciones } from "./Direcciones";
import { Generos } from "./Generos";
import { Registrosdesparasitaciones } from "./Registrosdesparasitaciones";
import { Registrosvacunas } from "./Registrosvacunas";
import { Usuarios } from "./Usuarios";
import { Ventas } from "./Ventas";

@Index("Correo", ["correo"], { unique: true })
@Index("IdDireccion", ["idDireccion"], {})
@Index("IdGenero", ["idGenero"], {})
@Entity("personas", { schema: "vetfolkbd" })
export class Personas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdPersona" })
  idPersona: number;

  @Column("int", { name: "IdDireccion", nullable: true })
  idDireccion: number | null;

  @Column("int", { name: "IdGenero", nullable: true })
  idGenero: number | null;

  @Column("varchar", { name: "Nombre1", nullable: true, length: 50 })
  nombre1: string | null;

  @Column("varchar", { name: "Nombre2", nullable: true, length: 50 })
  nombre2: string | null;

  @Column("varchar", { name: "Apellido1", nullable: true, length: 50 })
  apellido1: string | null;

  @Column("varchar", { name: "Apellido2", nullable: true, length: 50 })
  apellido2: string | null;

  @Column("varchar", { name: "DNI", nullable: true, length: 13 })
  dni: string | null;

  @Column("date", { name: "FechaNac", nullable: true })
  fechaNac: Date | null;

  @Column("varchar", { name: "Telefono", nullable: true, length: 8 })
  telefono: string | null;

  @Column("varchar", {
    name: "Correo",
    nullable: true,
    unique: true,
    length: 50,
  })
  correo: string | null;

  @Column("varchar", { name: "Contrasena", nullable: true, length: 255 })
  contrasena: string | null;

  @OneToMany(() => Consultas, (consultas) => consultas.idVeterinario2)
  consultas: Consultas[];

  @OneToMany(() => Mascotas, (mascotas) => mascotas.idPropietario2)
  mascotas: Mascotas[];

  @OneToMany(() => Personal, (personal) => personal.idPersona2)
  personals: Personal[];

  @ManyToOne(() => Direcciones, (direcciones) => direcciones.personas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdDireccion", referencedColumnName: "idDireccion" }])
  idDireccion2: Direcciones;

  @ManyToOne(() => Generos, (generos) => generos.personas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "IdGenero", referencedColumnName: "idGenero" }])
  idGenero2: Generos;

  @OneToMany(
    () => Registrosdesparasitaciones,
    (registrosdesparasitaciones) => registrosdesparasitaciones.idVeterinario2
  )
  registrosdesparasitaciones: Registrosdesparasitaciones[];

  @OneToMany(
    () => Registrosvacunas,
    (registrosvacunas) => registrosvacunas.idVeterinario2
  )
  registrosvacunas: Registrosvacunas[];

  @OneToOne(() => Usuarios, (usuarios) => usuarios.idUsuario2)
  usuarios: Usuarios;

  @OneToMany(() => Ventas, (ventas) => ventas.idCliente2)
  ventas: Ventas[];
}
