import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { getStatusJob } from './jobs/HealthCheckJob';
import createTables from './repositories/database/CreateTables';
import { router } from './routes';
import cors from 'cors';

const app = express();

createTables();
getStatusJob.start();
app.use(cors());
app.use(express.json());
app.use(router);

export { app };
