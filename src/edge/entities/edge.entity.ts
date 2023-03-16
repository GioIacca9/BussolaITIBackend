export class Edge {
  startVertexId: number;
  endVertexId: number;
  weight: number;

  constructor(startVertexId: number, endVertexId: number, weight: number) {
    this.startVertexId = startVertexId;
    this.endVertexId = endVertexId;
    this.weight = weight;
  }
}
