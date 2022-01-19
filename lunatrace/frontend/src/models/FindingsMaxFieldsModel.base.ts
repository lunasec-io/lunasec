/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * FindingsMaxFieldsBase
 * auto generated base class for the model FindingsMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const FindingsMaxFieldsModelBase = ModelBase
  .named('FindingsMaxFields')
  .props({
    __typename: types.optional(types.literal("findings_max_fields"), "findings_max_fields"),
    id: types.union(types.undefined, types.null, types.frozen()),
    language: types.union(types.undefined, types.null, types.string),
    matcher: types.union(types.undefined, types.null, types.string),
    package_name: types.union(types.undefined, types.null, types.string),
    package_version_id: types.union(types.undefined, types.null, types.frozen()),
    purl: types.union(types.undefined, types.null, types.string),
    report_id: types.union(types.undefined, types.null, types.frozen()),
    type: types.union(types.undefined, types.null, types.string),
    version: types.union(types.undefined, types.null, types.string),
    version_matcher: types.union(types.undefined, types.null, types.string),
    virtual_path: types.union(types.undefined, types.null, types.string),
    vulnerability_id: types.union(types.undefined, types.null, types.frozen()),
    vulnerability_package_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class FindingsMaxFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get language() { return this.__attr(`language`) }
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
}
export function selectFromFindingsMaxFields() {
  return new FindingsMaxFieldsModelSelector()
}

export const findingsMaxFieldsModelPrimitives = selectFromFindingsMaxFields().language.matcher.package_name.package_version_id.purl.report_id.type.version.version_matcher.virtual_path.vulnerability_id.vulnerability_package_id
