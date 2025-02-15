// src/notificaciones/entities/notificacion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuarios } from './Usuarios';

@Entity('notificacion')
export class Notificacion {
  @PrimaryGeneratedColumn()
  idNotificacion: number;

  @Column()
  idUsuario: number;

  @Column('text')
  mensaje: string;

  @Column()
  fecha: Date;

  @Column({ default: false })
  leida: boolean;

  @ManyToOne(() => Usuarios, (usuario) => usuario.notificacion)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuarios;
}
