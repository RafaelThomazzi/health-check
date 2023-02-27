import cron from "cron";
import { getStatusUseCase } from "../useCases/GetIntegraStatus";

export enum JobStatus {
  Unavailable = "UNAVAILABLE",
  Ok = "OK",
  Error = "ERROR",
}

let status: JobStatus = JobStatus.Unavailable;
let scanEndpoints: JobStatus | Array<object> = JobStatus.Unavailable;
let unavailableServices = null;

async function getStatus() {
  try {
    console.log("Getting Integra Status...", new Date().toISOString());

    const {
      endpoints,
      status: workingStatus,
      unavailableServices: failedRequests,
    } = await getStatusUseCase.execute();

    status = workingStatus;
    scanEndpoints = endpoints;
    unavailableServices = failedRequests;
  } catch (error) {
    console.error(error);
  }
}

export const getStatusJob = new cron.CronJob("*/1 * * * *", () => {
  getStatus();
});

export default function (app) {
  app.get("/status", (_request, response) => {
    if (status == JobStatus.Error) {
      return response.json({ status, unavailableServices });
    }
    return response.json({ status });
  });

  app.get("/scan", (_request, response) => {
    return response.json({ endpoints: scanEndpoints });
  });
}
