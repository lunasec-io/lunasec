import { Instance } from "mobx-state-tree"
import { ReportsAggregateModelBase } from "./ReportsAggregateModel.base"

/* The TypeScript type of an instance of ReportsAggregateModel */
export interface ReportsAggregateModelType extends Instance<typeof ReportsAggregateModel.Type> {}

/* A graphql query fragment builders for ReportsAggregateModel */
export { selectFromReportsAggregate, reportsAggregateModelPrimitives, ReportsAggregateModelSelector } from "./ReportsAggregateModel.base"

/**
 * ReportsAggregateModel
 *
 * aggregated selection of "reports"
 */
export const ReportsAggregateModel = ReportsAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
