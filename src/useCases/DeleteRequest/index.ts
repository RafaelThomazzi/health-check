import { SqliteRequestsRepository } from "../../repositories/implementations/SqliteRequestsRepository";
import { DeleteRequestUseCase } from "./DeleteRequestUseCase";
import { DeleteRequestController } from "./DeleteRequestController";
import { SqliteSnapshotsRepository } from "../../repositories/implementations/SqliteSnapshotsRepository";

const sqliteRequestsRepository = new SqliteRequestsRepository()
const sqliteSnapshotsRepository = new SqliteSnapshotsRepository();


const deleteRequestUseCase = new DeleteRequestUseCase(
  sqliteRequestsRepository,
  sqliteSnapshotsRepository
)

const deleteRequestController = new DeleteRequestController(
  deleteRequestUseCase
)

export { deleteRequestUseCase, deleteRequestController }