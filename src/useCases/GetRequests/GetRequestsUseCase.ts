import { IRequestsRepository } from "../../repositories/IRequestsRepository";

export class GetRequestsUseCase {
  constructor(private requestsRepository: IRequestsRepository) {}

  async execute() {
    try {
      return await this.requestsRepository.findAllWithSnapshot();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
