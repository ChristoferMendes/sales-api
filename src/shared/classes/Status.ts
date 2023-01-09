export class Status {
  public ok = 200 as const;
  public created = 202 as const;
  public unauthenticated = 401 as const;
  public notFound = 404 as const;
  public conflict = 409 as const;
  public tooManyRequests = 429 as const;
  public badRequest = 400 as const;
}

export const { ok, created, unauthenticated, notFound, conflict, tooManyRequests, badRequest } = new Status();
