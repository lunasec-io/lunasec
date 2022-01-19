import { Instance } from "mobx-state-tree"
import { RelatedVulnerabilitiesAggregateModelBase } from "./RelatedVulnerabilitiesAggregateModel.base"

/* The TypeScript type of an instance of RelatedVulnerabilitiesAggregateModel */
export interface RelatedVulnerabilitiesAggregateModelType extends Instance<typeof RelatedVulnerabilitiesAggregateModel.Type> {}

/* A graphql query fragment builders for RelatedVulnerabilitiesAggregateModel */
export { selectFromRelatedVulnerabilitiesAggregate, relatedVulnerabilitiesAggregateModelPrimitives, RelatedVulnerabilitiesAggregateModelSelector } from "./RelatedVulnerabilitiesAggregateModel.base"

/**
 * RelatedVulnerabilitiesAggregateModel
 *
 * aggregated selection of "related_vulnerabilities"
 */
export const RelatedVulnerabilitiesAggregateModel = RelatedVulnerabilitiesAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
