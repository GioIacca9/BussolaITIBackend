import { IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class CreateVertexDto {
  @IsNotEmpty()
  @IsNumber()
  x: number;
  @IsNotEmpty()
  @IsNumber()
  y: number;
  @IsNotEmpty()
  @IsInt()
  floor: number;
}
