import { Instance } from "mobx-state-tree"
import { FindingsAggregateModelBase } from "./FindingsAggregateModel.base"

/* The TypeScript type of an instance of FindingsAggregateModel */
export interface FindingsAggregateModelType extends Instance<typeof FindingsAggregateModel.Type> {}

/* A graphql query fragment builders for FindingsAggregateModel */
export { selectFromFindingsAggregate, findingsAggregateModelPrimitives, FindingsAggregateModelSelector } from "./FindingsAggregateModel.base"

/**
 * FindingsAggregateModel
 *
 * aggregated selection of "findings"
 */
export const FindingsAggregateModel = FindingsAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
