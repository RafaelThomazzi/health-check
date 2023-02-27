import { Router } from "express";
import { createRequestController } from "./useCases/CreateRequest";
import { healthCheckController } from "./useCases/HealthCheck";
import { takeSnapshotController } from "./useCases/TakeSnapshots";
import { deleteRequestController } from "./useCases/DeleteRequest";
import { getRequestsController } from "./useCases/GetRequests";
import statusRoute from './jobs/HealthCheckJob';

const router = Router()

router.get('/requests', (request, response) => {
  return getRequestsController.handle(request, response);
});

router.post('/requests', (request, response) => {
  return createRequestController.handle(request, response);
});

router.delete('/requests/:id', (request, response) => {
  return deleteRequestController.handle(request, response);
});

router.post('/take-snapshot', (request, response) => {
  return takeSnapshotController.handle(request, response);
});

router.get('/health-check', (request, response) => {
  return healthCheckController.handle(request, response);
});

statusRoute(router);

export { router }