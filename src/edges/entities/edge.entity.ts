import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Edge {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsNotEmpty()
  @IsInt()
  startVertexId: number;
  @Column()
  @IsNotEmpty()
  @IsInt()
  endVertexId: number;
  @Column()
  @IsNotEmpty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  weight: number;

  constructor(
    startVertexId: number,
    endVertexId: number,
    weight: number,
    id?: number
  ) {
    id ? (this.id = id) : null; // Se viene dato un id (per sovrascrivere un'altra entità preesistente) allora lo inseriamo, altrimenti verrà aggiunto in automatico seguendo un ordine progressivo
    this.startVertexId = startVertexId;
    this.endVertexId = endVertexId;
    this.weight = weight;
  }
}
