import { IEdge } from './index';

export interface IGraph {
  addNodeId(nodeId: string): number,
  removeNodeId(nodeId: string): void,
  getNodesId(): string[],
  getEdges(): IEdge[],
  containsNodeId(nodeId: string): boolean,
  addEdge(nodeA: string, nodeB: string) : number,
  removeEdge(nodeA: string, nodeB: string) :void,
  areConnected(nodeA: string, nodeB: string): boolean,
  getNeighborsOf(nodeId: string): string[],
  clone(): IGraph,
  print():void
}