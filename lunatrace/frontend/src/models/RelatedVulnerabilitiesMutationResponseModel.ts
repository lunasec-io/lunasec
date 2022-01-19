import { Instance } from "mobx-state-tree"
import { RelatedVulnerabilitiesMutationResponseModelBase } from "./RelatedVulnerabilitiesMutationResponseModel.base"

/* The TypeScript type of an instance of RelatedVulnerabilitiesMutationResponseModel */
export interface RelatedVulnerabilitiesMutationResponseModelType extends Instance<typeof RelatedVulnerabilitiesMutationResponseModel.Type> {}

/* A graphql query fragment builders for RelatedVulnerabilitiesMutationResponseModel */
export { selectFromRelatedVulnerabilitiesMutationResponse, relatedVulnerabilitiesMutationResponseModelPrimitives, RelatedVulnerabilitiesMutationResponseModelSelector } from "./RelatedVulnerabilitiesMutationResponseModel.base"

/**
 * RelatedVulnerabilitiesMutationResponseModel
 *
 * response of any mutation on the table "related_vulnerabilities"
 */
export const RelatedVulnerabilitiesMutationResponseModel = RelatedVulnerabilitiesMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
