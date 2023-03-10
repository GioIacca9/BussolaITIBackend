import { PartialType } from '@nestjs/mapped-types';
import { CreateEdgeDto } from './create-edge.dto';

export class UpdateEdgeDto extends PartialType(CreateEdgeDto) {}
