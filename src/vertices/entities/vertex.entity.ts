import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vertex {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  x: number;
  @Column()
  y: number;
  @Column()
  floor: number;
  @ManyToMany(() => Service)
  @JoinTable()
  services: Service[];

  constructor(
    x: number,
    y: number,
    floor: number,
    id?: number,
    services?: Service[]
  ) {
    id ? (this.id = id) : null; // Se viene dato un id (per sovrascrivere un'altra entità preesistente) allora lo inseriamo, altrimenti verrà aggiunto in automatico seguendo un ordine progressivo
    this.x = x;
    this.y = y;
    this.floor = floor;
    this.services = services;
  }
}
