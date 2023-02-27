import { makeHTTPRequest } from "../../providers/implementations/HTTPClient";
import { IRequestsRepository } from "../../repositories/IRequestsRepository";
import { ISnapshotsRepository } from "../../repositories/ISnapshotsRepository";
import { ICreateRequestRequestDTO } from "./CreateRequestDTO";

export class CreateRequestUseCase {
  constructor(
    private requestsRepository: IRequestsRepository,
    private snapshotsRepository: ISnapshotsRepository
  ) {}

  async execute(data: ICreateRequestRequestDTO) {
    try {
      const { url, method, body } = data;

      const startTime = Date.now();
      const response = await makeHTTPRequest(url, method, body);
      const endTime = Date.now();

      if (response instanceof Error) {
        throw new Error(
          `Error on ${url} method ${method}.  ${response.message}`
        );
      }

      const { status, data: result } = response;

      const insertedRequest: any = await this.requestsRepository.insertRequest(data);

      const snapshot = {
        result: JSON.stringify(result),
        requestId: insertedRequest.lastID,
        status,
        executionTime: endTime - startTime,
      }

      const insertedSnapshot: any = await this.snapshotsRepository.insertSnapshot(snapshot);

      if(!insertedSnapshot?.lastID){
        throw new Error(`Error when inserting snapshot`)
      }

      return {...snapshot, ...data, id: insertedSnapshot.lastID};
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
