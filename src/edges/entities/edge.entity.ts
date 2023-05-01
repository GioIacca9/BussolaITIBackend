import {
  IsInt,
  IsMACAddress,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { randomUUID } from 'node:crypto';
import { Vertex } from 'src/vertices/entities/vertex.entity';

export class Edge {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsInt()
  startVertexId: number;
  @IsNotEmpty()
  @IsInt()
  endVertexId: number;
  @IsNotEmpty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  weight: number;

  constructor(startVertexId: number, endVertexId: number, weight: number) {
    this.id = randomUUID();
    this.startVertexId = startVertexId;
    this.endVertexId = endVertexId;
    this.weight = weight;
  }
}
