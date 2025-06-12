import { apiPath } from "@/lib/api/utils";

type HandlerOptions = {
  throwError?: boolean;
};

class ApiResponseError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorData: any;

  constructor(message: string, errorData?: unknown) {
    super(message);
    this.name = 'ApiResponseError';
    this.errorData = errorData || {};
  }
}

const catchError = (error: unknown, callback: (msg: string) => void) => {
  if (error instanceof ApiResponseError) {
    callback(error.errorData.message);
  } else if (error instanceof Error) {
    callback(error.message ?? 'Có lỗi xảy ra');
  }
};

const isPromiseFunction = (fn: unknown): fn is () => Promise<unknown> =>
  typeof fn === 'function' && fn.constructor.name === 'AsyncFunction';

export const asyncHandlerWrapper = async <T>(
  handler: () => Promise<T> | T,
  errorHandler: (msg: string) => void,
  options?: HandlerOptions,
): Promise<T | Error> => {
  const { throwError = false } = options || {};

  try {
    const result = isPromiseFunction(handler) ? await handler() : handler();

    return result as T;
  } catch (error) {
    catchError(error, errorHandler);

    if (throwError) throw error;
    return error as Error;
  }
};

export async function handleFetch<T>(
  url: string,
  bodyObj?: unknown,
  method: "GET" | "POST" | "PUT" | "DELETE" = bodyObj ? "POST" : "GET"
): Promise<T> {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(apiPath(url), {
    method,
    headers,
    body: bodyObj ? JSON.stringify(bodyObj) : undefined,
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      payload?.error?.message ||
      payload?.message ||
      `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return payload as T;
}

