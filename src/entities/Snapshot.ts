export class Snapshot {
  public readonly id?: string;
  public requestId: string;
  public result: string;
  public status: number;
  public executionTime: number | string;
  public createdAt?: Date;

  constructor(props: Snapshot) {
    Object.assign(this, props);
  }
}
