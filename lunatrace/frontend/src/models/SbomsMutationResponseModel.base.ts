/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SbomsModel, SbomsModelType } from "./SbomsModel"
import { SbomsModelSelector } from "./SbomsModel.base"
import { RootStoreType } from "./index"


/**
 * SbomsMutationResponseBase
 * auto generated base class for the model SbomsMutationResponseModel.
 *
 * response of any mutation on the table "sboms"
 */
export const SbomsMutationResponseModelBase = ModelBase
  .named('SbomsMutationResponse')
  .props({
    __typename: types.optional(types.literal("sboms_mutation_response"), "sboms_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => SbomsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SbomsMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | SbomsModelSelector | ((selector: SbomsModelSelector) => SbomsModelSelector)) { return this.__child(`returning`, SbomsModelSelector, builder) }
}
export function selectFromSbomsMutationResponse() {
  return new SbomsMutationResponseModelSelector()
}

export const sbomsMutationResponseModelPrimitives = selectFromSbomsMutationResponse().affected_rows
