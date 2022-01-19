/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FindingsModel, FindingsModelType } from "./FindingsModel"
import { FindingsModelSelector } from "./FindingsModel.base"
import { RootStoreType } from "./index"


/**
 * FindingsMutationResponseBase
 * auto generated base class for the model FindingsMutationResponseModel.
 *
 * response of any mutation on the table "findings"
 */
export const FindingsMutationResponseModelBase = ModelBase
  .named('FindingsMutationResponse')
  .props({
    __typename: types.optional(types.literal("findings_mutation_response"), "findings_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => FindingsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class FindingsMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | FindingsModelSelector | ((selector: FindingsModelSelector) => FindingsModelSelector)) { return this.__child(`returning`, FindingsModelSelector, builder) }
}
export function selectFromFindingsMutationResponse() {
  return new FindingsMutationResponseModelSelector()
}

export const findingsMutationResponseModelPrimitives = selectFromFindingsMutationResponse().affected_rows
