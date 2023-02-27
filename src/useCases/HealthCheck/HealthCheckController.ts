import { Request, Response } from "express";
import { HealthCheckUseCase } from "./HealthCheckUseCase";

export class HealthCheckController {
  constructor(
    private healthCheckUseCase: HealthCheckUseCase,
  ) {}

  async handle(_request: Request, response: Response): Promise<Response> {
    try {
      const result = await this.healthCheckUseCase.execute()
  
      return response.status(200).json(result);  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}