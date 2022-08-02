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
import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    depth?: number;
    size?: number;
    inline?: string;
  }
}

declare global {
  interface Window {
    Atlas: {
      identify: (o: Record<string, string>) => void;
      shutdown: () => void;
      recording: {
        start: () => void;
        stop: () => void;
      };
    };
    AtlasScriptTag: {
      onload: () => void;
    };
  }
}

// declare module 'prettify-date' {
//   import * as prettifyDate from 'prettify-date';
//   export default prettifyDate;
// }

interface WindowOrWorkerGlobalScope {
  structuredClone(value: any, options?: StructuredSerializeOptions): any;
}
declare function structuredClone(value: any, options?: StructuredSerializeOptions): any;
