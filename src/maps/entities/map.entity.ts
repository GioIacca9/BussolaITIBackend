import { Edge } from 'src/edges/entities/edge.entity';
import { Route } from 'src/routes/entities/route.entity';
import { Vertex } from 'src/vertices/entities/vertex.entity';

export class Map {
  name: string;
  id: number;
  edges: Edge[];
  vertices: Vertex[];
  calculatedRoutes: Route[];
}
