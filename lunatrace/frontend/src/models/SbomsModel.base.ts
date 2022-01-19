/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ScansAggregateModel, ScansAggregateModelType } from "./ScansAggregateModel"
import { ScansAggregateModelSelector } from "./ScansAggregateModel.base"
import { ScansModel, ScansModelType } from "./ScansModel"
import { ScansModelSelector } from "./ScansModel.base"
import { RootStoreType } from "./index"


/**
 * SbomsBase
 * auto generated base class for the model SbomsModel.
 *
 * columns and relationships of "sboms"
 */
export const SbomsModelBase = ModelBase
  .named('Sboms')
  .props({
    __typename: types.optional(types.literal("sboms"), "sboms"),
    created_at: types.union(types.undefined, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    s3_url: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    scans: types.union(types.undefined, types.array(types.late((): any => ScansModel))),
    /** An aggregate relationship */
    scans_aggregate: types.union(types.undefined, types.late((): any => ScansAggregateModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SbomsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get id() { return this.__attr(`id`) }
  get s3_url() { return this.__attr(`s3_url`) }
  scans(builder?: string | ScansModelSelector | ((selector: ScansModelSelector) => ScansModelSelector)) { return this.__child(`scans`, ScansModelSelector, builder) }
  scans_aggregate(builder?: string | ScansAggregateModelSelector | ((selector: ScansAggregateModelSelector) => ScansAggregateModelSelector)) { return this.__child(`scans_aggregate`, ScansAggregateModelSelector, builder) }
}
export function selectFromSboms() {
  return new SbomsModelSelector()
}

export const sbomsModelPrimitives = selectFromSboms().created_at.s3_url
