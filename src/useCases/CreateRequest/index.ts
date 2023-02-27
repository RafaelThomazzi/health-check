import { SqliteRequestsRepository } from "../../repositories/implementations/SqliteRequestsRepository";
import { CreateRequestUseCase } from "./CreateRequestUseCase";
import { CreateRequestController } from "./CreateRequestController";
import { SqliteSnapshotsRepository } from "../../repositories/implementations/SqliteSnapshotsRepository";

const sqliteRequestsRepository = new SqliteRequestsRepository()
const sqliteSnapshotsRepository = new SqliteSnapshotsRepository();

const createRequestUseCase = new CreateRequestUseCase(
  sqliteRequestsRepository,
  sqliteSnapshotsRepository
)

const createRequestController = new CreateRequestController(
  createRequestUseCase
)

export { createRequestUseCase, createRequestController }