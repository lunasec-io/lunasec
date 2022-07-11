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
//   import { Convert, ScanReport } from "./file";
//
//   const scanReport = Convert.toScanReport(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
/* eslint-disable */
import {log} from "../utils/log";

export interface GrypeScanReport {
  matches: Match[];
  source: Source;
  distro: Distro;
  descriptor: Descriptor;
}

export interface Descriptor {
  name: string;
  version: string;
  configuration: Configuration;
  db: DescriptorDB;
}

export interface Configuration {
  configPath: string;
  output: string;
  file: string;
  'output-template-file': string;
  quiet: boolean;
  'check-for-app-update': boolean;
  'only-fixed': boolean;
  scope: string;
  log: Log;
  db: ConfigurationDB;
  dev: Dev;
  'fail-on-severity': string;
  registry: Registry;
  ignore: null;
  exclude: any[];
}

export interface ConfigurationDB {
  'cache-dir': string;
  'update-url': string;
  'ca-cert': string;
  'auto-update': boolean;
  'validate-by-hash-on-start': boolean;
}

export interface Dev {
  'profile-cpu': boolean;
  'profile-mem': boolean;
}

export interface Log {
  structured: boolean;
  level: string;
  file: string;
}

export interface Registry {
  'insecure-skip-tls-verify': boolean;
  'insecure-use-http': boolean;
  auth: any[];
}

export interface DescriptorDB {
  built: Date;
  schemaVersion: number;
  location: string;
  checksum: string;
  error: null;
}

export interface Distro {
  name: string;
  version: string;
  idLike: string;
}

export interface Match {
  vulnerability: Vulnerability;
  relatedVulnerabilities: Vulnerability[];
  matchDetails: MatchDetail[];
  artifact: Artifact;
}

export interface Artifact {
  name: string;
  version: string;
  type: Type;
  locations: Location[];
  language: Language;
  licenses: any[];
  cpes: string[];
  purl: string;
  metadata: Metadata | null;
}

export enum Language {
  Go = 'go',
  Java = 'java',
}

export interface Location {
  path: string;
}

export interface Metadata {
  VirtualPath: string;
  PomArtifactID: string;
  PomGroupID: PomGroupID;
  ManifestName: string;
}

export enum PomGroupID {
  COMFasterxmlJacksonCore = 'com.fasterxml.jackson.core',
  COMGoogleGuava = 'com.google.guava',
  ChQosLogback = 'ch.qos.logback',
  CommonsIo = 'commons-io',
  IoNetty = 'io.netty',
  OrgApacheGeronimoSpecs = 'org.apache.geronimo.specs',
  OrgApacheHttpcomponents = 'org.apache.httpcomponents',
  OrgApacheLoggingLog4J = 'org.apache.logging.log4j',
  OrgHibernate = 'org.hibernate',
  OrgYAML = 'org.yaml',
}

export enum Type {
  GoModule = 'go-module',
  JavaArchive = 'java-archive',
}

export interface MatchDetail {
  matcher: Matcher;
  searchedBy: SearchedBy;
  found: Found;
}

export interface Found {
  versionConstraint: string;
  cpes?: string[];
}

export enum Matcher {
  JavaMatcher = 'java-matcher',
  StockMatcher = 'stock-matcher',
}

export interface SearchedBy {
  namespace: Namespace;
  cpes?: string[];
  language?: Language;
}

export enum Namespace {
  GithubGo = 'github:go',
  GithubJava = 'github:java',
  Nvd = 'nvd',
}

export interface Vulnerability {
  id: string;
  dataSource: string;
  namespace: Namespace;
  severity: Severity;
  urls: string[];
  description: string;
  cvss: Cvss[];
  fix?: Fix;
  advisories?: any[];
}

export interface Cvss {
  version: string;
  vector: string;
  metrics: Metrics;
  vendorMetadata: VendorMetadata;
}

export interface Metrics {
  baseScore: number;
  exploitabilityScore: number;
  impactScore: number;
}

export interface VendorMetadata {}

export interface Fix {
  versions: string[];
  state: State;
}

export enum State {
  Fixed = 'fixed',
  NotFixed = 'not-fixed',
  Unknown = 'unknown',
}

export enum Severity {
  Critical = 'Critical',
  High = 'High',
  Low = 'Low',
  Medium = 'Medium',
}

export interface Source {
  type: string;
  target: string;
}

export function parseJsonToGrypeScanReport(json: string): GrypeScanReport | null {
  // disable all type reflection/checking for now as it is too fragile
  try {
    return JSON.parse(json) as GrypeScanReport;
  } catch (e) {
    log.error('unable to parse scan report json', {
      error: e,
      json
    });
    return null;
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

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  ScanReport: o(
    [
      { json: 'matches', js: 'matches', typ: a(r('Match')) },
      { json: 'source', js: 'source', typ: r('Source') },
      { json: 'distro', js: 'distro', typ: r('Distro') },
      { json: 'descriptor', js: 'descriptor', typ: r('Descriptor') },
    ],
    false
  ),
  Descriptor: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'version', js: 'version', typ: '' },
      { json: 'configuration', js: 'configuration', typ: r('Configuration') },
      { json: 'db', js: 'db', typ: r('DescriptorDB') },
    ],
    false
  ),
  Configuration: o(
    [
      { json: 'configPath', js: 'configPath', typ: '' },
      { json: 'output', js: 'output', typ: '' },
      { json: 'file', js: 'file', typ: '' },
      { json: 'output-template-file', js: 'output-template-file', typ: '' },
      { json: 'quiet', js: 'quiet', typ: true },
      { json: 'check-for-app-update', js: 'check-for-app-update', typ: true },
      { json: 'only-fixed', js: 'only-fixed', typ: true },
      { json: 'scope', js: 'scope', typ: '' },
      { json: 'log', js: 'log', typ: r('Log') },
      { json: 'db', js: 'db', typ: r('ConfigurationDB') },
      { json: 'dev', js: 'dev', typ: r('Dev') },
      { json: 'fail-on-severity', js: 'fail-on-severity', typ: '' },
      { json: 'registry', js: 'registry', typ: r('Registry') },
      { json: 'ignore', js: 'ignore', typ: null },
      { json: 'exclude', js: 'exclude', typ: a('any') },
    ],
    false
  ),
  ConfigurationDB: o(
    [
      { json: 'cache-dir', js: 'cache-dir', typ: '' },
      { json: 'update-url', js: 'update-url', typ: '' },
      { json: 'ca-cert', js: 'ca-cert', typ: '' },
      { json: 'auto-update', js: 'auto-update', typ: true },
      { json: 'validate-by-hash-on-start', js: 'validate-by-hash-on-start', typ: true },
    ],
    false
  ),
  Dev: o(
    [
      { json: 'profile-cpu', js: 'profile-cpu', typ: true },
      { json: 'profile-mem', js: 'profile-mem', typ: true },
    ],
    false
  ),
  Log: o(
    [
      { json: 'structured', js: 'structured', typ: true },
      { json: 'level', js: 'level', typ: '' },
      { json: 'file', js: 'file', typ: '' },
    ],
    false
  ),
  Registry: o(
    [
      { json: 'insecure-skip-tls-verify', js: 'insecure-skip-tls-verify', typ: true },
      { json: 'insecure-use-http', js: 'insecure-use-http', typ: true },
      { json: 'auth', js: 'auth', typ: a('any') },
    ],
    false
  ),
  DescriptorDB: o(
    [
      { json: 'built', js: 'built', typ: Date },
      { json: 'schemaVersion', js: 'schemaVersion', typ: 0 },
      { json: 'location', js: 'location', typ: '' },
      { json: 'checksum', js: 'checksum', typ: '' },
      { json: 'error', js: 'error', typ: null },
    ],
    false
  ),
  Distro: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'version', js: 'version', typ: '' },
      { json: 'idLike', js: 'idLike', typ: '' },
    ],
    false
  ),
  Match: o(
    [
      { json: 'vulnerability', js: 'vulnerability', typ: r('Vulnerability') },
      { json: 'relatedVulnerabilities', js: 'relatedVulnerabilities', typ: a(r('Vulnerability')) },
      { json: 'matchDetails', js: 'matchDetails', typ: a(r('MatchDetail')) },
      { json: 'artifact', js: 'artifact', typ: r('Artifact') },
    ],
    false
  ),
  Artifact: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'version', js: 'version', typ: '' },
      { json: 'type', js: 'type', typ: r('Type') },
      { json: 'locations', js: 'locations', typ: a(r('Location')) },
      { json: 'language', js: 'language', typ: r('Language') },
      { json: 'licenses', js: 'licenses', typ: a('any') },
      { json: 'cpes', js: 'cpes', typ: a('') },
      { json: 'purl', js: 'purl', typ: '' },
      { json: 'metadata', js: 'metadata', typ: u(r('Metadata'), null) },
    ],
    false
  ),
  Location: o([{ json: 'path', js: 'path', typ: '' }], false),
  Metadata: o(
    [
      { json: 'VirtualPath', js: 'VirtualPath', typ: '' },
      { json: 'PomArtifactID', js: 'PomArtifactID', typ: '' },
      { json: 'PomGroupID', js: 'PomGroupID', typ: r('PomGroupID') },
      { json: 'ManifestName', js: 'ManifestName', typ: '' },
    ],
    false
  ),
  MatchDetail: o(
    [
      { json: 'matcher', js: 'matcher', typ: r('Matcher') },
      { json: 'searchedBy', js: 'searchedBy', typ: r('SearchedBy') },
      { json: 'found', js: 'found', typ: r('Found') },
    ],
    false
  ),
  Found: o(
    [
      { json: 'versionConstraint', js: 'versionConstraint', typ: '' },
      { json: 'cpes', js: 'cpes', typ: u(undefined, a('')) },
    ],
    false
  ),
  SearchedBy: o(
    [
      { json: 'namespace', js: 'namespace', typ: r('Namespace') },
      { json: 'cpes', js: 'cpes', typ: u(undefined, a('')) },
      { json: 'language', js: 'language', typ: u(undefined, r('Language')) },
    ],
    false
  ),
  Vulnerability: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'dataSource', js: 'dataSource', typ: '' },
      { json: 'namespace', js: 'namespace', typ: r('Namespace') },
      { json: 'severity', js: 'severity', typ: r('Severity') },
      { json: 'urls', js: 'urls', typ: a('') },
      { json: 'description', js: 'description', typ: '' },
      { json: 'cvss', js: 'cvss', typ: a(r('Cvss')) },
      { json: 'fix', js: 'fix', typ: u(undefined, r('Fix')) },
      { json: 'advisories', js: 'advisories', typ: u(undefined, a('any')) },
    ],
    false
  ),
  Cvss: o(
    [
      { json: 'version', js: 'version', typ: '' },
      { json: 'vector', js: 'vector', typ: '' },
      { json: 'metrics', js: 'metrics', typ: r('Metrics') },
      { json: 'vendorMetadata', js: 'vendorMetadata', typ: r('VendorMetadata') },
    ],
    false
  ),
  Metrics: o(
    [
      { json: 'baseScore', js: 'baseScore', typ: 3.14 },
      { json: 'exploitabilityScore', js: 'exploitabilityScore', typ: 3.14 },
      { json: 'impactScore', js: 'impactScore', typ: 3.14 },
    ],
    false
  ),
  VendorMetadata: o([], false),
  Fix: o(
    [
      { json: 'versions', js: 'versions', typ: a('') },
      { json: 'state', js: 'state', typ: r('State') },
    ],
    false
  ),
  Source: o(
    [
      { json: 'type', js: 'type', typ: '' },
      { json: 'target', js: 'target', typ: '' },
    ],
    false
  ),
  Language: ['go', 'java'],
  PomGroupID: [
    'com.fasterxml.jackson.core',
    'com.google.guava',
    'ch.qos.logback',
    'commons-io',
    'io.netty',
    'org.apache.geronimo.specs',
    'org.apache.httpcomponents',
    'org.apache.logging.log4j',
    'org.hibernate',
    'org.yaml',
  ],
  Type: ['go-module', 'java-archive'],
  Matcher: ['java-matcher', 'stock-matcher'],
  Namespace: ['github:go', 'github:java', 'nvd'],
  State: ['fixed', 'not-fixed', 'unknown'],
  Severity: ['Critical', 'High', 'Low', 'Medium'],
};
