import { IsNotEmpty } from 'class-validator';

export class Vertex {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  x: number;
  @IsNotEmpty()
  y: number;
  @IsNotEmpty()
  floor: number;

  constructor(id: string, x: number, y: number, floor: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.floor = floor;
  }
}
