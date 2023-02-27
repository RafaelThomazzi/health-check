import { makeHTTPRequest } from "../../providers/implementations/HTTPClient";
import { IRequestsRepository } from "../../repositories/IRequestsRepository";
import { ISnapshotsRepository } from "../../repositories/ISnapshotsRepository";

export class TakeSnapshotUseCase {
  constructor(
    private requestsRepository: IRequestsRepository,
    private snapshotsRepository: ISnapshotsRepository
  ) {}

  async execute() {
    try {
      const requests = await this.requestsRepository.findAll();
      await this.snapshotsRepository.deleteAllSnapshots();

      for (const request of requests) {
        const { url, method, body } = request;

        const startTime = Date.now();

        const response = await makeHTTPRequest(url, method, body);
        if(response instanceof Error){
          console.error(`Error on ${url} method ${method}.  ${response.message}`);
          continue;
        }

        const { status, data: result } = response;

        const endTime = Date.now();

        await this.snapshotsRepository.insertSnapshot({
          result: JSON.stringify(result),
          requestId: request.id,
          status,
          executionTime: endTime - startTime,
        });
      }

      return await this.snapshotsRepository.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
