import { SqliteRequestsRepository } from "../../repositories/implementations/SqliteRequestsRepository";
import { GetRequestsUseCase } from "./GetRequestsUseCase";
import { GetRequestsController } from "./GetRequestsController";

const sqliteRequestsRepository = new SqliteRequestsRepository()

const getRequestsUseCase = new GetRequestsUseCase(
  sqliteRequestsRepository,
)

const getRequestsController = new GetRequestsController(
  getRequestsUseCase
)

export { getRequestsUseCase, getRequestsController }