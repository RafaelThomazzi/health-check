import { Snapshot } from "../../entities/Snapshot";
import { convertToCamelCase } from "../../utils/helpers";
import { openDatabase } from "../database/DatabaseConnection";
import { ISnapshotsRepository } from "../ISnapshotsRepository";

export class SqliteSnapshotsRepository implements ISnapshotsRepository {
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

  async findByRequestId(requestId: string): Promise<Snapshot> {
    try {
      const response = await this.database.get(
        "SELECT * FROM snapshots WHERE request_id=?",
        [requestId]
      );
      return convertToCamelCase(response) as Snapshot;
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(): Promise<Snapshot[]> {
    try {
      const response = await this.database.all("SELECT * FROM snapshots ORDER BY id DESC");
      return convertToCamelCase(response) as Snapshot[];
    } catch (error) {
      console.error(error);
    }
  }

  async insertSnapshot(snapshot: Snapshot) {
    try {
      console.log(snapshot);
      
      const response = await this.database.run(
        "INSERT INTO snapshots (request_id, result, status, execution_time, created_at) VALUES (?,?,?,?,?)",
        [
          snapshot.requestId,
          snapshot.result,
          snapshot.status,
          snapshot.executionTime,
          new Date(),
        ]
      );
      return convertToCamelCase(response);
    } catch (error) {
      console.error(error);
    }
  }

  async updateSnapshot(id: string, snapshot: Snapshot) {
    try {
      const response = await this.database.run(
        "UPDATE snapshots SET result=?, status=?, execution_time=? WHERE id=?",
        [snapshot.result, snapshot.status, snapshot.executionTime, id]
      );
      return convertToCamelCase(response);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteSnapshot(id: string) {
    try {
      const response = await this.database.run(
        "DELETE FROM snapshots WHERE id=?",
        [id]
      );
      return convertToCamelCase(response);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteSnapshotByRequestId(id: string) {
    try {
      const response = await this.database.run(
        "DELETE FROM snapshots WHERE request_id=?",
        [id]
      );
      return convertToCamelCase(response);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAllSnapshots() {
    try {
      const response = await this.database.run(
        "DELETE FROM snapshots WHERE 1=1"
      );
      return convertToCamelCase(response);
    } catch (error) {
      console.error(error);
    }
  }
}
