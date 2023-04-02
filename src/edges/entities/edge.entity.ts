import { IsNotEmpty } from 'class-validator';
import { randomUUID } from 'node:crypto';

export class Edge {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  startVertexId: number;
  @IsNotEmpty()
  endVertexId: number;
  @IsNotEmpty()
  weight: number;

  constructor(startVertexId: number, endVertexId: number, weight: number) {
    this.id = randomUUID();
    this.startVertexId = startVertexId;
    this.endVertexId = endVertexId;
    this.weight = weight;
  }
}
