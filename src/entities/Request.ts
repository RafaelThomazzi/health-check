export class Request {
  public readonly id?: string;
  public name: string;
  public url: string;
  public method: string;
  public body?: string;

  constructor(props: Request) {
    Object.assign(this, props);
  }
}
