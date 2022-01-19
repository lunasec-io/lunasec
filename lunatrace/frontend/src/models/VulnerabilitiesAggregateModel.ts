import { Instance } from "mobx-state-tree"
import { VulnerabilitiesAggregateModelBase } from "./VulnerabilitiesAggregateModel.base"

/* The TypeScript type of an instance of VulnerabilitiesAggregateModel */
export interface VulnerabilitiesAggregateModelType extends Instance<typeof VulnerabilitiesAggregateModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesAggregateModel */
export { selectFromVulnerabilitiesAggregate, vulnerabilitiesAggregateModelPrimitives, VulnerabilitiesAggregateModelSelector } from "./VulnerabilitiesAggregateModel.base"

/**
 * VulnerabilitiesAggregateModel
 *
 * aggregated selection of "vulnerabilities"
 */
export const VulnerabilitiesAggregateModel = VulnerabilitiesAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
