import {
  IsInt,
  IsMACAddress,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class Vertex {
  @IsNotEmpty()
  @IsMACAddress()
  id: string;
  @IsNotEmpty()
  @IsNumber()
  x: number;
  @IsNotEmpty()
  @IsNumber()
  y: number;
  @IsNotEmpty()
  @IsInt()
  floor: number;

  constructor(id: string, x: number, y: number, floor: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.floor = floor;
  }
}
