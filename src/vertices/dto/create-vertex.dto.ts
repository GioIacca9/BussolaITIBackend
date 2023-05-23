import {
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsArray,
  IsOptional,
} from 'class-validator';

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
  @IsArray()
  services: number[];
}
