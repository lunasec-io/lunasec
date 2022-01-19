import { Instance } from "mobx-state-tree"
import { SbomsAggregateModelBase } from "./SbomsAggregateModel.base"

/* The TypeScript type of an instance of SbomsAggregateModel */
export interface SbomsAggregateModelType extends Instance<typeof SbomsAggregateModel.Type> {}

/* A graphql query fragment builders for SbomsAggregateModel */
export { selectFromSbomsAggregate, sbomsAggregateModelPrimitives, SbomsAggregateModelSelector } from "./SbomsAggregateModel.base"

/**
 * SbomsAggregateModel
 *
 * aggregated selection of "sboms"
 */
export const SbomsAggregateModel = SbomsAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
