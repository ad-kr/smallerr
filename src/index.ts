class Error<T> {
	constructor(public error: T) {}
}

export type Result<Ok = undefined, Err = unknown> = Ok | Error<Err>;
export type AsyncResult<Ok = undefined, Err = unknown> = Promise<
	Result<Ok, Err>
>;

export function err(): Error<undefined>;
export function err<T>(error: T): Error<T>;

export function err<T>(error?: T) {
	return new Error(error);
}

export function isErr<T>(result: Result<unknown, T>): result is Error<T> {
	return result instanceof Error;
}
