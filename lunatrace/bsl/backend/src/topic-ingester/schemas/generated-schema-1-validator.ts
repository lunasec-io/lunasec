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
// To parse this data:
//
//   import { Convert, TopicMetadata1 } from "./file";
//
//   const topicMetadata1 = Convert.toTopicMetadata1(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import {TopicMetadata1} from "@lunatrace/lunatrace-common";

export {TopicMetadata1} from '@lunatrace/lunatrace-common';

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toTopicMetadata1(json: string): TopicMetadata1 {
        return cast(JSON.parse(json), r("TopicMetadata1"));
    }
    public static toTopicMetadata1FromObject(obj: unknown): TopicMetadata1{
        return cast(obj, r('TopicMetadata1'))
    }

    public static topicMetadata1ToJson(value: TopicMetadata1): string {
        return JSON.stringify(uncast(value, r("TopicMetadata1")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "TopicMetadata1": o([
        { json: "schemaVersion", js: "schemaVersion", typ: 0 },
        { json: "cves", js: "cves", typ: a("") },
        { json: "name", js: "name", typ: "" },
        { json: "summary", js: "summary", typ: "" },
        { json: "language", js: "language", typ: "" },
        { json: "severity", js: "severity", typ: "" },
        { json: "advisories", js: "advisories", typ: a(r("Advisory")) },
        { json: "cwe", js: "cwe", typ: r("Cwe") },
        { json: "tags", js: "tags", typ: a("") },
        { json: "packages", js: "packages", typ: a(r("Package")) },
        { json: "conditions", js: "conditions", typ: a(r("Condition")) },
        { json: "tools", js: "tools", typ: a(r("Tool")) },
        { json: "relatedTopics", js: "relatedTopics", typ: a("") },
    ], false),
    "Advisory": o([
        { json: "type", js: "type", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "url", js: "url", typ: "" },
    ], false),
    "Condition": o([
        { json: "type", js: "type", typ: "" },
        { json: "purl", js: "purl", typ: u(undefined, "") },
        { json: "versionConstraint", js: "versionConstraint", typ: "" },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], false),
    "Cwe": o([
        { json: "number", js: "number", typ: 0 },
        { json: "name", js: "name", typ: "" },
    ], false),
    "Package": o([
        { json: "type", js: "type", typ: "" },
        { json: "purl", js: "purl", typ: "" },
        { json: "language", js: "language", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "versionConstraint", js: "versionConstraint", typ: "" },
        { json: "fixed", js: "fixed", typ: true },
        { json: "fixVersion", js: "fixVersion", typ: "" },
    ], false),
    "Tool": o([
        { json: "name", js: "name", typ: "" },
        { json: "link", js: "link", typ: "" },
    ], false),
};
