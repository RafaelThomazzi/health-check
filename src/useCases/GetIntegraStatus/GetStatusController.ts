import { Request, Response } from "express";
import { GetStatusUseCase } from "./GetStatusUseCase";

export class GetStatusController {
  constructor(
    private getStatusUseCase: GetStatusUseCase,
  ) {}

  async handle(_request: Request, response: Response): Promise<Response> {
    try {
      const result = await this.getStatusUseCase.execute()
  
      return response.status(200).json(result);  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}