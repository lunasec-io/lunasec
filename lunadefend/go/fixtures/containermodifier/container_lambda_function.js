/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
backpack = {};
__input_data = "";

const outputTag = "REFINERY_OUTPUT_CUSTOM_RUNTIME"

process.stdin.setEncoding("utf8");

process.stdin.on('readable', function() {
	var chunk;
	while (chunk = process.stdin.read()) {
		__input_data += chunk;
	}
});

process.stdin.on('end', function () {
	__rfn_init();
});

function __returnResult(programOutput) {
	console.log(
		`<${outputTag}>` + JSON.stringify(
		programOutput
		) + `</${outputTag}>`
	);
}

/**
 * Wraps a function with a promise. Returns a new function that can be called with await.
 */
function __promisify(fn) {
	return function promiseWrappedFunction() {
		return new Promise((resolve, reject) => {
			function wrapCallback(err, result) {
				// If error, reject the promise.
				if (err) {
					return reject(err);
				}
				// Call resolve to close the promise
				resolve(result);
			}

			// Concatenate to arguments list the wrapCallback function
			const argumentsList = [
				...(Array.prototype.slice.apply(arguments)),
				wrapCallback
			];

			// Call the wrapped function
			fn.apply(this, argumentsList);
		});
	}
}

async function __rfn_init() {
	try {
		if (process.stdout._handle) {
			process.stdout._handle.setBlocking(true);
		}

		// Inside of the try catch statement to ensure that any exceptions thrown here are logged.
		const inputData = JSON.parse( __input_data );
		const lambdaInput = inputData[ "block_input" ];
		const backpack = inputData[ "backpack" ];

		const importPath = inputData["import_path"];
		const functionName = inputData["function_name"];

		const importedFile = require(importPath);
		const mainEntrypoint = importedFile[functionName];

		const result = await mainEntrypoint(...lambdaInput, backpack);

		__returnResult({
			"result": result,
			"error": "",
			"backpack": backpack,
		});

		backpack = {};
		flushProcessOutputsAndExit__refinery(0);
	} catch ( e ) {
		if( e.stack ) {
			e = e.stack.toString()
		} else {
			e = e.toString();
		}
		console.log(
			`<${outputTag}>` + JSON.stringify({
				"result": "",
				"error": e,
				"backpack": backpack
			}) + `</${outputTag}>`
		);
		backpack = {};
		flushProcessOutputsAndExit__refinery(-1);
	}
}

function flushProcessOutputsAndExit__refinery(exitCode) {
	// Configure the streams to be blocking
	makeBlockingStream__refinery(process.stdout);
	makeBlockingStream__refinery(process.stderr);


	// Allow Node to cleanup any internals before the next process tick
	setImmediate(function callProcessExitWithCode() {
		process.exit(exitCode);
	});
}

function makeBlockingStream__refinery(stream) {
	if (!stream || !stream._handle || !stream._handle.setBlocking) {
		// Not able to set blocking so just bail out
		return;
	}

	stream._handle.setBlocking(true);
}
