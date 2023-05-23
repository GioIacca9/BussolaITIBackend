import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsString()
  name: string;

  constructor(name: string, id?: number) {
    id ? (this.id = id) : null;
    this.name = name;
  }
}
