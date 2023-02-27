import { Request } from "../../entities/Request";
import { convertToCamelCase } from "../../utils/helpers";
import { openDatabase } from "../database/DatabaseConnection";
import { IRequestsRepository } from "../IRequestsRepository";

export class SqliteRequestsRepository implements IRequestsRepository {
  private database: any;

  constructor() {
    this.startDatabase();
  }

  private async startDatabase() {
    if (!this.database) {
      this.database = await openDatabase();
    }
    return this.database;
  }

  async findAll(): Promise<Request[]> {
    try {
      const response = await this.database.all("SELECT * FROM requests ORDER BY id DESC");
      return convertToCamelCase(response) as Request[];
    } catch (error) {
      console.error(error);
    }
  }

  async insertRequest(request: Request) {
    try {
      const body =
        typeof request?.body != "string"
          ? JSON.stringify(request.body)
          : request?.body;

      const response = await this.database.run(
        "INSERT INTO requests (name, url, method, body) VALUES (?,?,?,?)",
        [request.name, request.url, request.method, request?.body ? body : null]
      );
      return convertToCamelCase(response);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteRequest(id: string) {
    try {
      const response = await this.database.run(
        "DELETE FROM requests WHERE id=?",
        [id]
      );
      return convertToCamelCase(response);
    } catch (error) {
      console.error(error);
    }
  }

  async findAllWithSnapshot(): Promise<Request[]> {
    try {
      const response = await this.database.all("SELECT * FROM requests r INNER JOIN snapshots s on s.request_id = r.id ORDER BY r.id DESC");
      return convertToCamelCase(response) as Request[];
    } catch (error) {
      console.error(error);
    }
  }
}
