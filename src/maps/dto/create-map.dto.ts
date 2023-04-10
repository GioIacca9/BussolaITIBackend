import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMapDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
