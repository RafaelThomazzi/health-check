import { Request, Response } from "express";
import { TakeSnapshotUseCase } from "./TakeSnapshotUseCase";

export class TakeSnapshotController {
  constructor(
    private takeSnapshotUseCase: TakeSnapshotUseCase,
  ) {}

  async handle(_request: Request, response: Response): Promise<Response> {
    try {
      const requests = await this.takeSnapshotUseCase.execute()
  
      return response.status(200).json(requests);  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}