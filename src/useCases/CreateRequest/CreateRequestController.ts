import { Request, Response } from "express";
import { CreateRequestUseCase } from "./CreateRequestUseCase";

export class CreateRequestController {
  constructor(
    private createRequestUseCase: CreateRequestUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, url, method, body } = request.body;

    try {
      const result = await this.createRequestUseCase.execute({
        name, url, method, body
      })
  
      return response.json(result);  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}