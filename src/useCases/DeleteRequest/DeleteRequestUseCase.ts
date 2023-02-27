import { IRequestsRepository } from "../../repositories/IRequestsRepository";
import { ISnapshotsRepository } from "../../repositories/ISnapshotsRepository";

export class DeleteRequestUseCase {
  constructor(
    private requestsRepository: IRequestsRepository,
    private snapshotsRepository: ISnapshotsRepository
  ) {}

  async execute(id: string) {
    try {
      await this.snapshotsRepository.deleteSnapshotByRequestId(id);
      return await this.requestsRepository.deleteRequest(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
