import { PHONE_NUMBERS } from "../../config/constants";
import { JobStatus } from "../../jobs/HealthCheckJob";
import { makeHTTPRequest } from "../../providers/implementations/HTTPClient";
import { IRequestsRepository } from "../../repositories/IRequestsRepository";
import { ISnapshotsRepository } from "../../repositories/ISnapshotsRepository";
import { INotificationService } from "../../services/INotificationService";

export class GetStatusUseCase {
  constructor(
    private requestsRepository: IRequestsRepository,
    private snapshotsRepository: ISnapshotsRepository,
    private notificationService: INotificationService
  ) {}

  async execute() {
    try {
      const requests = await this.requestsRepository.findAll();
      const endpoints = [];
      let unavailableServices = [];

      for (const request of requests) {
        const { url, method, body } = request;

        let working = JobStatus.Error;

        const response = await makeHTTPRequest(url, method, body);

        if (response instanceof Error) {
          console.error(
            `Error on ${url} method ${method}.  ${response.message}`
          );

          endpoints.push({
            name: request?.name,
            url,
            status: JobStatus.Error,
          });
          continue;
        }

        const { status, data: result } = response;

        const snapshot = await this.snapshotsRepository.findByRequestId(
          request.id
        );

        if (JSON.stringify(result) == snapshot?.result && status == snapshot?.status) {
          working = JobStatus.Ok;
        }

        endpoints.push({
          name: request?.name,
          url,
          status: working,
        });
      }

      const failedRequests = endpoints.filter(
        (endpoint) => endpoint.status == JobStatus.Error
      );

      const status =
        failedRequests?.length > 0 ? JobStatus.Error : JobStatus.Ok;

      if (status == JobStatus.Error) {
        unavailableServices = failedRequests.map((request) => request.name);

        const message = `Existem serviços indisponiveis no momento: ${unavailableServices.join(
          ","
        )}`;

        await this.notificationService.sendSMS(PHONE_NUMBERS, message);
      }

      return { endpoints, status, unavailableServices };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
