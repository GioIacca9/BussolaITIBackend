import { IsNotEmpty } from 'class-validator';

export class CreateMapDto {
  @IsNotEmpty()
  name: string;
}
