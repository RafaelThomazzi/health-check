import { SqliteRequestsRepository } from "../../repositories/implementations/SqliteRequestsRepository";
import { SqliteSnapshotsRepository } from "../../repositories/implementations/SqliteSnapshotsRepository";
import { HealthCheckController } from "./HealthCheckController";
import { HealthCheckUseCase } from "./HealthCheckUseCase";

const sqliteRequestsRepository = new SqliteRequestsRepository();
const sqliteSnapshotsRepository = new SqliteSnapshotsRepository();

const healthCheckUseCase = new HealthCheckUseCase(
  sqliteRequestsRepository,
  sqliteSnapshotsRepository
);

const healthCheckController = new HealthCheckController(healthCheckUseCase);

export { healthCheckUseCase, healthCheckController };
