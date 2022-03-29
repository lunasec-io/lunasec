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
/* eslint-disable */

// To parse this data:
//
//   import { Convert } from "./file";
//
//   const vulnerabilities = Convert.toVulnerabilities(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import {GrypeMeta} from "./grype-vulnerability-metadata";

export interface GrypeVuln {
  pk: number;
  id: string;
  package_name: string;
  namespace: string;
  version_constraint: string;
  version_format: VersionFormat;
  cpes: string;
  related_vulnerabilities: string;
  fixed_in_versions: string;
  fix_state: FixState;
  advisories: string;
  metadata?: GrypeMeta;
}

export enum FixState {
  Fixed = 'fixed',
  NotFixed = 'not-fixed',
  Unknown = 'unknown',
  WontFix = 'wont-fix',
}

export enum Namespace {
  Alpine310 = 'alpine:3.10',
  Alpine311 = 'alpine:3.11',
  Alpine312 = 'alpine:3.12',
  Alpine313 = 'alpine:3.13',
  Alpine314 = 'alpine:3.14',
  Alpine315 = 'alpine:3.15',
  Alpine32 = 'alpine:3.2',
  Alpine33 = 'alpine:3.3',
  Alpine34 = 'alpine:3.4',
  Alpine35 = 'alpine:3.5',
  Alpine36 = 'alpine:3.6',
  Alpine37 = 'alpine:3.7',
  Alpine38 = 'alpine:3.8',
  Alpine39 = 'alpine:3.9',
  Amzn2 = 'amzn:2',
  Debian10 = 'debian:10',
  Debian11 = 'debian:11',
  Debian12 = 'debian:12',
  Debian7 = 'debian:7',
  Debian8 = 'debian:8',
  Debian9 = 'debian:9',
  DebianUnstable = 'debian:unstable',
  GithubComposer = 'github:composer',
  GithubGem = 'github:gem',
  GithubGo = 'github:go',
  GithubJava = 'github:java',
  GithubNpm = 'github:npm',
  GithubNuget = 'github:nuget',
  GithubPython = 'github:python',
  Nvd = 'nvd',
  Ol5 = 'ol:5',
  Ol6 = 'ol:6',
  Ol7 = 'ol:7',
  Ol8 = 'ol:8',
  RHEL5 = 'rhel:5',
  RHEL6 = 'rhel:6',
  RHEL7 = 'rhel:7',
  RHEL8 = 'rhel:8',
  SLES11 = 'sles:11',
  SLES111 = 'sles:11.1',
  SLES112 = 'sles:11.2',
  SLES113 = 'sles:11.3',
  SLES114 = 'sles:11.4',
  SLES12 = 'sles:12',
  SLES121 = 'sles:12.1',
  SLES122 = 'sles:12.2',
  SLES123 = 'sles:12.3',
  SLES124 = 'sles:12.4',
  SLES125 = 'sles:12.5',
  SLES15 = 'sles:15',
  SLES151 = 'sles:15.1',
  SLES152 = 'sles:15.2',
  Ubuntu1204 = 'ubuntu:12.04',
  Ubuntu1210 = 'ubuntu:12.10',
  Ubuntu1304 = 'ubuntu:13.04',
  Ubuntu1404 = 'ubuntu:14.04',
  Ubuntu1410 = 'ubuntu:14.10',
  Ubuntu1504 = 'ubuntu:15.04',
  Ubuntu1510 = 'ubuntu:15.10',
  Ubuntu1604 = 'ubuntu:16.04',
  Ubuntu1610 = 'ubuntu:16.10',
  Ubuntu1704 = 'ubuntu:17.04',
  Ubuntu1710 = 'ubuntu:17.10',
  Ubuntu1804 = 'ubuntu:18.04',
  Ubuntu1810 = 'ubuntu:18.10',
  Ubuntu1904 = 'ubuntu:19.04',
  Ubuntu1910 = 'ubuntu:19.10',
  Ubuntu2004 = 'ubuntu:20.04',
  Ubuntu2010 = 'ubuntu:20.10',
  Ubuntu2104 = 'ubuntu:21.04',
  Ubuntu2110 = 'ubuntu:21.10',
}

export enum VersionFormat {
  Apk = 'apk',
  Dpkg = 'dpkg',
  Python = 'python',
  RPM = 'rpm',
  Unknown = 'unknown',
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toVulnerabilities(json: string): GrypeVuln[] {
    return cast(JSON.parse(json), a(r('Vulnerabilities')));
  }

  public static jsonBlobToVulnerabilities(obj: Record<string, unknown>): GrypeVuln[] {
    return obj as unknown as GrypeVuln[]; // just cast it because these type validators have turned out to be too fragile
  }

  public static vulnerabilitiesToJson(value: GrypeVuln[]): string {
    return JSON.stringify(uncast(value, a(r('Vulnerabilities'))), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
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
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
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

function o(props: any[], additional: any) {
  return { props, additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Vulnerabilities: o(
    [
      { json: 'pk', js: 'pk', typ: 0 },
      { json: 'id', js: 'id', typ: '' },
      { json: 'package_name', js: 'package_name', typ: '' },
      { json: 'namespace', js: 'namespace', typ: r('Namespace') },
      { json: 'version_constraint', js: 'version_constraint', typ: '' },
      { json: 'version_format', js: 'version_format', typ: r('VersionFormat') },
      { json: 'cpes', js: 'cpes', typ: '' },
      { json: 'related_vulnerabilities', js: 'related_vulnerabilities', typ: '' },
      { json: 'fixed_in_versions', js: 'fixed_in_versions', typ: '' },
      { json: 'fix_state', js: 'fix_state', typ: r('FixState') },
      { json: 'advisories', js: 'advisories', typ: '' },
    ],
    false
  ),
  FixState: ['fixed', 'not-fixed', 'unknown', 'wont-fix'],
  Namespace: [
    'alpine:3.10',
    'alpine:3.11',
    'alpine:3.12',
    'alpine:3.13',
    'alpine:3.14',
    'alpine:3.15',
    'alpine:3.2',
    'alpine:3.3',
    'alpine:3.4',
    'alpine:3.5',
    'alpine:3.6',
    'alpine:3.7',
    'alpine:3.8',
    'alpine:3.9',
    'amzn:2',
    'debian:10',
    'debian:11',
    'debian:12',
    'debian:7',
    'debian:8',
    'debian:9',
    'debian:unstable',
    'github:composer',
    'github:gem',
    'github:go',
    'github:java',
    'github:npm',
    'github:nuget',
    'github:python',
    'nvd',
    'ol:5',
    'ol:6',
    'ol:7',
    'ol:8',
    'rhel:5',
    'rhel:6',
    'rhel:7',
    'rhel:8',
    'sles:11',
    'sles:11.1',
    'sles:11.2',
    'sles:11.3',
    'sles:11.4',
    'sles:12',
    'sles:12.1',
    'sles:12.2',
    'sles:12.3',
    'sles:12.4',
    'sles:12.5',
    'sles:15',
    'sles:15.1',
    'sles:15.2',
    'ubuntu:12.04',
    'ubuntu:12.10',
    'ubuntu:13.04',
    'ubuntu:14.04',
    'ubuntu:14.10',
    'ubuntu:15.04',
    'ubuntu:15.10',
    'ubuntu:16.04',
    'ubuntu:16.10',
    'ubuntu:17.04',
    'ubuntu:17.10',
    'ubuntu:18.04',
    'ubuntu:18.10',
    'ubuntu:19.04',
    'ubuntu:19.10',
    'ubuntu:20.04',
    'ubuntu:20.10',
    'ubuntu:21.04',
    'ubuntu:21.10',
  ],
  VersionFormat: ['apk', 'dpkg', 'python', 'rpm', 'unknown'],
};
