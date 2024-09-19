export type Safe<T> =
  | { success: true; data: T }
  | { success: false; error: string; errorObj?: Error };

export function safe<T>(promise: Promise<T>): Promise<Safe<T>>;
export function safe<T>(function_: () => T): Safe<T>;
export function safe<T>(
  promiseOrFunction: Promise<T> | (() => T),
): Promise<Safe<T>> | Safe<T> {
  if (promiseOrFunction instanceof Promise) {
    return safeAsync(promiseOrFunction);
  }
  return safeSync(promiseOrFunction);
}

async function safeAsync<T>(promise: Promise<T>): Promise<Safe<T>> {
  try {
    const data = await promise;
    return { data, success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message, errorObj: error };
    }
    return { success: false, error: "Something went wrong"};
  }
}

function safeSync<T>(function_: () => T): Safe<T> {
  try {
    const data = function_();
    return { data, success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message, errorObj: error };
    }
    return { success: false, error: "Something went wrong" };
  }
}
