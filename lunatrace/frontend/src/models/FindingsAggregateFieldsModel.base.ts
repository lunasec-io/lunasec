/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FindingsMaxFieldsModel, FindingsMaxFieldsModelType } from "./FindingsMaxFieldsModel"
import { FindingsMaxFieldsModelSelector } from "./FindingsMaxFieldsModel.base"
import { FindingsMinFieldsModel, FindingsMinFieldsModelType } from "./FindingsMinFieldsModel"
import { FindingsMinFieldsModelSelector } from "./FindingsMinFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * FindingsAggregateFieldsBase
 * auto generated base class for the model FindingsAggregateFieldsModel.
 *
 * aggregate fields of "findings"
 */
export const FindingsAggregateFieldsModelBase = ModelBase
  .named('FindingsAggregateFields')
  .props({
    __typename: types.optional(types.literal("findings_aggregate_fields"), "findings_aggregate_fields"),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => FindingsMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => FindingsMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class FindingsAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder?: string | FindingsMaxFieldsModelSelector | ((selector: FindingsMaxFieldsModelSelector) => FindingsMaxFieldsModelSelector)) { return this.__child(`max`, FindingsMaxFieldsModelSelector, builder) }
  min(builder?: string | FindingsMinFieldsModelSelector | ((selector: FindingsMinFieldsModelSelector) => FindingsMinFieldsModelSelector)) { return this.__child(`min`, FindingsMinFieldsModelSelector, builder) }
}
export function selectFromFindingsAggregateFields() {
  return new FindingsAggregateFieldsModelSelector()
}

export const findingsAggregateFieldsModelPrimitives = selectFromFindingsAggregateFields().count
