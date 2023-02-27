import { Request, Response } from "express";
import { GetRequestsUseCase } from "./GetRequestsUseCase";

export class GetRequestsController {
  constructor(private getRequestsUseCase: GetRequestsUseCase) {}

  async handle(_request: Request, response: Response): Promise<Response> {
    try {
      const data = await this.getRequestsUseCase.execute();

      return response.status(200).json(data);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
