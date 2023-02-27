import { Request } from "../entities/Request";

export interface IRequestsRepository {
  deleteRequest(id: string): Promise<unknown>
  findAll(): Promise<Request[]>;
  insertRequest(request: Request): Promise<unknown>;
  findAllWithSnapshot(): Promise<Request[]>
}