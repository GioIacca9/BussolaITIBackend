import { IsInt, IsNotEmpty } from 'class-validator';

export class RequestRouteDto {
  @IsInt()
  @IsNotEmpty()
  startVertexId: number;
  @IsInt()
  @IsNotEmpty()
  endVertexId: number;
}
