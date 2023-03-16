import { PartialType } from '@nestjs/swagger';
import { CreateVertexDto } from './create-vertex.dto';

export class UpdateVertexDto extends PartialType(CreateVertexDto) {}
