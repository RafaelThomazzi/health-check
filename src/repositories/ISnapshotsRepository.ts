import { Snapshot } from "../entities/Snapshot";

export interface ISnapshotsRepository {
  findByRequestId(requestId: string): Promise<Snapshot>;
  findAll(): Promise<Snapshot[]>;
  insertSnapshot(snapshot: Snapshot): Promise<unknown>;
  updateSnapshot(id: string, snapshot: Snapshot): Promise<unknown>;
  deleteSnapshot(id: string): Promise<unknown>;
  deleteSnapshotByRequestId(id: string): Promise<unknown>;
  deleteAllSnapshots(): Promise<unknown>;
}