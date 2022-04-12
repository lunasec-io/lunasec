/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
interface ParsedInt {
  success: true;
  value: number;
}

interface ParsedIntError {
  success: false;
  error: string;
}

// By using a union type like this, you're able to avoid possibly "undefined" valued based on if
// success is set to true/false. It's a nice TypeScript feature.
export function tryParseInt(value: string, radix = 10): ParsedInt | ParsedIntError {
  try {
    return {
      value: parseInt(value, radix),
      success: true,
    };
  } catch (e) {
    return {
      success: false,
      error: `${e}`,
    };
  }
}

export function tryGithubIdBase64Decode(data: string): string {
  try {
    const decoded = Buffer.from(data, 'base64').toString()
    if (decoded.match(/[0-9]+:(User|Repo)[0-9]+/)) {
      return decoded;
    }
    return data;
  } catch (e) {
    return data;
  }
}
