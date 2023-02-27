import { SqliteRequestsRepository } from "../../repositories/implementations/SqliteRequestsRepository";
import { SqliteSnapshotsRepository } from "../../repositories/implementations/SqliteSnapshotsRepository";
import { SnsNotificationService } from "../../services/implementations/NotificationService";
import { GetStatusController } from "./GetStatusController";
import { GetStatusUseCase } from "./GetStatusUseCase";

const sqliteRequestsRepository = new SqliteRequestsRepository();
const sqliteSnapshotsRepository = new SqliteSnapshotsRepository();
const snsNotificationService = new SnsNotificationService()

const getStatusUseCase = new GetStatusUseCase(
  sqliteRequestsRepository,
  sqliteSnapshotsRepository,
  snsNotificationService
);

const getStatusController = new GetStatusController(getStatusUseCase);

export { getStatusUseCase, getStatusController };
