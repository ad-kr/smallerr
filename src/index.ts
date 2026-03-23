// Symbol would be even better, but it doesn't serialize.
const __errorMarker = undefined;

type Error<T> = {
	error: T;
};

export type Result<Ok = undefined, Err = unknown> = Ok | Error<Err>;
export type AsyncResult<Ok = undefined, Err = unknown> = Promise<
	Result<Ok, Err>
>;

export function err(): Error<undefined>;
export function err<T>(error: T): Error<T>;

export function err<T>(error?: T): Error<T> {
	// We cast to Error<T> to hide the __errorMarker property from the type system (it's only
	// used at runtime by `isErr`). The cast also narrows `error` from T | undefined to T, which
	// is safe because when no argument is passed, T itself is inferred as undefined.
	return {
		__errorMarker,
		error,
	} as Error<T>;
}

export function isErr<T>(result: Result<unknown, T>): result is Error<T> {
	return (
		typeof result === "object" &&
		result !== null &&
		"__errorMarker" in result
	);
}
