import { Request, Response } from "express";
import { DeleteRequestUseCase } from "./DeleteRequestUseCase";

export class DeleteRequestController {
  constructor(private updateRequestUseCase: DeleteRequestUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = await this.updateRequestUseCase.execute(request.params.id);

      return response.status(200).json(data);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
