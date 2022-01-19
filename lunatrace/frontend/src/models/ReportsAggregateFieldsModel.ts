import { Instance } from "mobx-state-tree"
import { ReportsAggregateFieldsModelBase } from "./ReportsAggregateFieldsModel.base"

/* The TypeScript type of an instance of ReportsAggregateFieldsModel */
export interface ReportsAggregateFieldsModelType extends Instance<typeof ReportsAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for ReportsAggregateFieldsModel */
export { selectFromReportsAggregateFields, reportsAggregateFieldsModelPrimitives, ReportsAggregateFieldsModelSelector } from "./ReportsAggregateFieldsModel.base"

/**
 * ReportsAggregateFieldsModel
 *
 * aggregate fields of "reports"
 */
export const ReportsAggregateFieldsModel = ReportsAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
