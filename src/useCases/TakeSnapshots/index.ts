import { SqliteRequestsRepository } from "../../repositories/implementations/SqliteRequestsRepository";
import { SqliteSnapshotsRepository } from "../../repositories/implementations/SqliteSnapshotsRepository";
import { TakeSnapshotController } from "./TakeSnapshotController";
import { TakeSnapshotUseCase } from "./TakeSnapshotUseCase";

const sqliteRequestsRepository = new SqliteRequestsRepository();
const sqliteSnapshotsRepository = new SqliteSnapshotsRepository();

const takeSnapshotUseCase = new TakeSnapshotUseCase(
  sqliteRequestsRepository,
  sqliteSnapshotsRepository
);

const takeSnapshotController = new TakeSnapshotController(takeSnapshotUseCase);

export { takeSnapshotUseCase, takeSnapshotController };
