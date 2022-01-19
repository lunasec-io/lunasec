import { Instance } from "mobx-state-tree"
import { RelatedVulnerabilitiesAggregateFieldsModelBase } from "./RelatedVulnerabilitiesAggregateFieldsModel.base"

/* The TypeScript type of an instance of RelatedVulnerabilitiesAggregateFieldsModel */
export interface RelatedVulnerabilitiesAggregateFieldsModelType extends Instance<typeof RelatedVulnerabilitiesAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for RelatedVulnerabilitiesAggregateFieldsModel */
export { selectFromRelatedVulnerabilitiesAggregateFields, relatedVulnerabilitiesAggregateFieldsModelPrimitives, RelatedVulnerabilitiesAggregateFieldsModelSelector } from "./RelatedVulnerabilitiesAggregateFieldsModel.base"

/**
 * RelatedVulnerabilitiesAggregateFieldsModel
 *
 * aggregate fields of "related_vulnerabilities"
 */
export const RelatedVulnerabilitiesAggregateFieldsModel = RelatedVulnerabilitiesAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
