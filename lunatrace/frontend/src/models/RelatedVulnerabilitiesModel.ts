import { Instance } from "mobx-state-tree"
import { RelatedVulnerabilitiesModelBase } from "./RelatedVulnerabilitiesModel.base"

/* The TypeScript type of an instance of RelatedVulnerabilitiesModel */
export interface RelatedVulnerabilitiesModelType extends Instance<typeof RelatedVulnerabilitiesModel.Type> {}

/* A graphql query fragment builders for RelatedVulnerabilitiesModel */
export { selectFromRelatedVulnerabilities, relatedVulnerabilitiesModelPrimitives, RelatedVulnerabilitiesModelSelector } from "./RelatedVulnerabilitiesModel.base"

/**
 * RelatedVulnerabilitiesModel
 *
 * join table for adding holding additional vulns on a finding   columns and relationships of "related_vulnerabilities"
 */
export const RelatedVulnerabilitiesModel = RelatedVulnerabilitiesModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
