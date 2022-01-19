/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ScansModel, ScansModelType } from "./ScansModel"
import { ScansModelSelector } from "./ScansModel.base"
import { RootStoreType } from "./index"


/**
 * ScansMutationResponseBase
 * auto generated base class for the model ScansMutationResponseModel.
 *
 * response of any mutation on the table "scans"
 */
export const ScansMutationResponseModelBase = ModelBase
  .named('ScansMutationResponse')
  .props({
    __typename: types.optional(types.literal("scans_mutation_response"), "scans_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => ScansModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ScansMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | ScansModelSelector | ((selector: ScansModelSelector) => ScansModelSelector)) { return this.__child(`returning`, ScansModelSelector, builder) }
}
export function selectFromScansMutationResponse() {
  return new ScansMutationResponseModelSelector()
}

export const scansMutationResponseModelPrimitives = selectFromScansMutationResponse().affected_rows
