import {
  IsInt,
  IsMACAddress,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { randomUUID } from 'node:crypto';

export class Edge {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsMACAddress()
  startVertexId: string;
  @IsNotEmpty()
  @IsMACAddress()
  endVertexId: string;
  @IsNotEmpty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  weight: number;

  constructor(startVertexId: string, endVertexId: string, weight: number) {
    this.id = randomUUID();
    this.startVertexId = startVertexId;
    this.endVertexId = endVertexId;
    this.weight = weight;
  }
}
