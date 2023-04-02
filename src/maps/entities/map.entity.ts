import { randomUUID } from 'node:crypto';
import { Edge } from 'src/edges/entities/edge.entity';
import { Route } from 'src/routes/entities/route.entity';
import { Vertex } from 'src/vertices/entities/vertex.entity';

export class Map {
  name: string;
  id: string;
  edges: Edge[];
  vertices: Vertex[];
  calculatedRoutes: Route[];

  constructor(name: string) {
    this.name = name;
    this.id = randomUUID();
    this.edges = [];
    this.vertices = [];
    this.calculatedRoutes = []; // TODO: Definire una modalità di calcolo dei percorsi
  }
}
