# smallerr

A small utility for easier error handling in Typescript.

## Usage

Use the `Result<Ok, Err>` type to create a result. The two generics, `Ok` and `Err`, determine what types we can return.

### Using the `Result`-type:

```ts
function maybeNumber(): Result<number, string> {
	// Use the `err()` function to easily create a new error
	if (Math.random() > 0.5) return err("Not this time!");

	return 42;
}

function handleResult() {
	const result = maybeNumber(); // type is `Result<number, string>`

	// Use the `isErr()` function to determine whether a result returned an error
	if (isErr(result)) {
		const message = result.error; // type is `string`
		return;
	}

	const ourNumber = result; // type is `number`
}
```

### Skipping the error type with `Result<Ok>`

Skipping the `Err`-generic in `Result<Ok, Err>` lets us return any type of error

```ts
// `Result<number>` is equivalent to `Result<number, unknown>`, which lets us return any error
function maybeNumber(): Result<number> {
	const randomNumber = Math.random();

	if (randomNumber > 0.75) return err("Not this time!");

	// Using `err()` without an argument is equivalent to calling `err(undefined)`
	if (randomNumber > 0.5) return err();

	return 42;
}
```

### Asynchronous results

If you're dealing with an asynchronous function, use `AsyncResult<Ok, Err>`

```ts
async function maybeAsyncNumber(): AsyncResult<number, string> {
	if (Math.random() > 0.5) return err("Not this time");

	await delay(500);

	return 42;
}

async function handleAsyncResult() {
	const result = await maybeAsyncNumber(); // result will be of type Result<number, string> when we await
}
```
