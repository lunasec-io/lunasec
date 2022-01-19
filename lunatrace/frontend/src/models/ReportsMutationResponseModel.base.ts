/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ReportsModel, ReportsModelType } from "./ReportsModel"
import { ReportsModelSelector } from "./ReportsModel.base"
import { RootStoreType } from "./index"


/**
 * ReportsMutationResponseBase
 * auto generated base class for the model ReportsMutationResponseModel.
 *
 * response of any mutation on the table "reports"
 */
export const ReportsMutationResponseModelBase = ModelBase
  .named('ReportsMutationResponse')
  .props({
    __typename: types.optional(types.literal("reports_mutation_response"), "reports_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => ReportsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ReportsMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | ReportsModelSelector | ((selector: ReportsModelSelector) => ReportsModelSelector)) { return this.__child(`returning`, ReportsModelSelector, builder) }
}
export function selectFromReportsMutationResponse() {
  return new ReportsMutationResponseModelSelector()
}

export const reportsMutationResponseModelPrimitives = selectFromReportsMutationResponse().affected_rows
