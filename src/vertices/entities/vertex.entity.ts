import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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

  constructor(x: number, y: number, floor: number, id?: number) {
    id ? (this.id = id) : null; // Se viene dato un id (per sovrascrivere un'altra entità preesistente) allora lo inseriamo, altrimenti verrà aggiunto in automatico seguendo un ordine progressivo
    this.x = x;
    this.y = y;
    this.floor = floor;
  }
}
