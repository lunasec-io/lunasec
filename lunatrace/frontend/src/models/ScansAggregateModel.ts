import { Instance } from "mobx-state-tree"
import { ScansAggregateModelBase } from "./ScansAggregateModel.base"

/* The TypeScript type of an instance of ScansAggregateModel */
export interface ScansAggregateModelType extends Instance<typeof ScansAggregateModel.Type> {}

/* A graphql query fragment builders for ScansAggregateModel */
export { selectFromScansAggregate, scansAggregateModelPrimitives, ScansAggregateModelSelector } from "./ScansAggregateModel.base"

/**
 * ScansAggregateModel
 *
 * aggregated selection of "scans"
 */
export const ScansAggregateModel = ScansAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
