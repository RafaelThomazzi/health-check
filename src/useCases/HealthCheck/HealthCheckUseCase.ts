import { makeHTTPRequest } from "../../providers/implementations/HTTPClient";
import { IRequestsRepository } from "../../repositories/IRequestsRepository";
import { ISnapshotsRepository } from "../../repositories/ISnapshotsRepository";

export class HealthCheckUseCase {
  constructor(
    private requestsRepository: IRequestsRepository,
    private snapshotsRepository: ISnapshotsRepository
  ) {}

  async execute() {
    try {
      const requests = await this.requestsRepository.findAll();

      const successfulRequests = [];
      const failedRequests = [];

      for (const request of requests) {
        const { url, method, body } = request;

        const startTime = Date.now();

        const snapshot = await this.snapshotsRepository.findByRequestId(
          request.id
        );

        const response = await makeHTTPRequest(url, method, body);
        const executionTime = Date.now() - startTime;

        if(response instanceof Error){
          console.error(`Error on ${url} method ${method}.  ${response.message}`);
          failedRequests.push({
            ...request,
            id: snapshot.id,
            requestId: request.id,
            result: JSON.stringify(response),
            expectedResult: snapshot?.result,
            status: 400,
            expectedStatus: snapshot?.status,
            executionTime,
            averageExecutionTime: snapshot?.executionTime,
          });

          continue;
        }

        const { status, data: result } = response;

        if (JSON.stringify(result) != snapshot?.result || status != snapshot.status || !snapshot) {
          failedRequests.push({
            ...request,
            id: snapshot.id,
            requestId: request.id,
            result: JSON.stringify(result),
            expectedResult: snapshot?.result,
            status,
            expectedStatus: snapshot?.status,
            executionTime,
            averageExecutionTime: snapshot?.executionTime,
          });
          continue;
        }

        successfulRequests.push({
          ...request,
          id: snapshot.id,
          requestId: request.id,
          result: JSON.stringify(result),
          executionTime,
          status,
          averageExecutionTime: snapshot.executionTime,
        });
      }

      return { failedRequests, successfulRequests };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
