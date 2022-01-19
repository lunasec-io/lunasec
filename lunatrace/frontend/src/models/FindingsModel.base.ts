/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PackageVersionsModel, PackageVersionsModelType } from "./PackageVersionsModel"
import { PackageVersionsModelSelector } from "./PackageVersionsModel.base"
import { ReportsModel, ReportsModelType } from "./ReportsModel"
import { ReportsModelSelector } from "./ReportsModel.base"
import { VulnerabilitiesModel, VulnerabilitiesModelType } from "./VulnerabilitiesModel"
import { VulnerabilitiesModelSelector } from "./VulnerabilitiesModel.base"
import { VulnerabilityPackagesModel, VulnerabilityPackagesModelType } from "./VulnerabilityPackagesModel"
import { VulnerabilityPackagesModelSelector } from "./VulnerabilityPackagesModel.base"
import { RootStoreType } from "./index"


/**
 * FindingsBase
 * auto generated base class for the model FindingsModel.
 *
 * columns and relationships of "findings"
 */
export const FindingsModelBase = ModelBase
  .named('Findings')
  .props({
    __typename: types.optional(types.literal("findings"), "findings"),
    id: types.union(types.undefined, types.frozen()),
    language: types.union(types.undefined, types.string),
    locations: types.union(types.undefined, types.frozen()),
    matcher: types.union(types.undefined, types.string),
    package_name: types.union(types.undefined, types.string),
    /** An object relationship */
    package_version: types.union(types.undefined, types.null, types.late((): any => PackageVersionsModel)),
    package_version_id: types.union(types.undefined, types.null, types.frozen()),
    purl: types.union(types.undefined, types.string),
    /** An object relationship */
    report: types.union(types.undefined, types.null, types.late((): any => ReportsModel)),
    report_id: types.union(types.undefined, types.null, types.frozen()),
    type: types.union(types.undefined, types.string),
    version: types.union(types.undefined, types.string),
    version_matcher: types.union(types.undefined, types.string),
    virtual_path: types.union(types.undefined, types.null, types.string),
    /** An object relationship */
    vulnerability: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesModel)),
    vulnerability_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    vulnerability_package: types.union(types.undefined, types.null, types.late((): any => VulnerabilityPackagesModel)),
    vulnerability_package_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class FindingsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get language() { return this.__attr(`language`) }
  get locations() { return this.__attr(`locations`) }
  get matcher() { return this.__attr(`matcher`) }
  get package_name() { return this.__attr(`package_name`) }
  get package_version_id() { return this.__attr(`package_version_id`) }
  get purl() { return this.__attr(`purl`) }
  get report_id() { return this.__attr(`report_id`) }
  get type() { return this.__attr(`type`) }
  get version() { return this.__attr(`version`) }
  get version_matcher() { return this.__attr(`version_matcher`) }
  get virtual_path() { return this.__attr(`virtual_path`) }
  get vulnerability_id() { return this.__attr(`vulnerability_id`) }
  get vulnerability_package_id() { return this.__attr(`vulnerability_package_id`) }
  package_version(builder?: string | PackageVersionsModelSelector | ((selector: PackageVersionsModelSelector) => PackageVersionsModelSelector)) { return this.__child(`package_version`, PackageVersionsModelSelector, builder) }
  report(builder?: string | ReportsModelSelector | ((selector: ReportsModelSelector) => ReportsModelSelector)) { return this.__child(`report`, ReportsModelSelector, builder) }
  vulnerability(builder?: string | VulnerabilitiesModelSelector | ((selector: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector)) { return this.__child(`vulnerability`, VulnerabilitiesModelSelector, builder) }
  vulnerability_package(builder?: string | VulnerabilityPackagesModelSelector | ((selector: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector)) { return this.__child(`vulnerability_package`, VulnerabilityPackagesModelSelector, builder) }
}
export function selectFromFindings() {
  return new FindingsModelSelector()
}

export const findingsModelPrimitives = selectFromFindings().language.locations.matcher.package_name.package_version_id.purl.report_id.type.version.version_matcher.virtual_path.vulnerability_id.vulnerability_package_id
