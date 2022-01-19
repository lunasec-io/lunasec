/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FindingsAggregateModel, FindingsAggregateModelType } from "./FindingsAggregateModel"
import { FindingsAggregateModelSelector } from "./FindingsAggregateModel.base"
import { FindingsModel, FindingsModelType } from "./FindingsModel"
import { FindingsModelSelector } from "./FindingsModel.base"
import { RootStoreType } from "./index"


/**
 * PackageVersionsBase
 * auto generated base class for the model PackageVersionsModel.
 *
 * columns and relationships of "package_versions"
 */
export const PackageVersionsModelBase = ModelBase
  .named('PackageVersions')
  .props({
    __typename: types.optional(types.literal("package_versions"), "package_versions"),
    cpes: types.union(types.undefined, types.frozen()),
    /** An array relationship */
    findings: types.union(types.undefined, types.array(types.late((): any => FindingsModel))),
    /** An aggregate relationship */
    findings_aggregate: types.union(types.undefined, types.late((): any => FindingsAggregateModel)),
    fix_state: types.union(types.undefined, types.string),
    fixed_in_versions: types.union(types.undefined, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    pkg_slug: types.union(types.undefined, types.string),
    slug: types.union(types.undefined, types.string),
    version_constraint: types.union(types.undefined, types.string),
    version_format: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PackageVersionsModelSelector extends QueryBuilder {
  get cpes() { return this.__attr(`cpes`) }
  get fix_state() { return this.__attr(`fix_state`) }
  get fixed_in_versions() { return this.__attr(`fixed_in_versions`) }
  get id() { return this.__attr(`id`) }
  get pkg_slug() { return this.__attr(`pkg_slug`) }
  get slug() { return this.__attr(`slug`) }
  get version_constraint() { return this.__attr(`version_constraint`) }
  get version_format() { return this.__attr(`version_format`) }
  findings(builder?: string | FindingsModelSelector | ((selector: FindingsModelSelector) => FindingsModelSelector)) { return this.__child(`findings`, FindingsModelSelector, builder) }
  findings_aggregate(builder?: string | FindingsAggregateModelSelector | ((selector: FindingsAggregateModelSelector) => FindingsAggregateModelSelector)) { return this.__child(`findings_aggregate`, FindingsAggregateModelSelector, builder) }
}
export function selectFromPackageVersions() {
  return new PackageVersionsModelSelector()
}

export const packageVersionsModelPrimitives = selectFromPackageVersions().cpes.fix_state.fixed_in_versions.pkg_slug.slug.version_constraint.version_format
