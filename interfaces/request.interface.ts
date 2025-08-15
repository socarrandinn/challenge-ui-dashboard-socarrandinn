export type RequestConfig = RequestInit & {
  params?: Record<string, unknown>;
  headers?: Partial<Record<string, string>> | undefined;
  next?: { tags?: string[] };

};
