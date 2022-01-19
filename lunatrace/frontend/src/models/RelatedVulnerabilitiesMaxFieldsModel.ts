import { Instance } from "mobx-state-tree"
import { RelatedVulnerabilitiesMaxFieldsModelBase } from "./RelatedVulnerabilitiesMaxFieldsModel.base"

/* The TypeScript type of an instance of RelatedVulnerabilitiesMaxFieldsModel */
export interface RelatedVulnerabilitiesMaxFieldsModelType extends Instance<typeof RelatedVulnerabilitiesMaxFieldsModel.Type> {}

/* A graphql query fragment builders for RelatedVulnerabilitiesMaxFieldsModel */
export { selectFromRelatedVulnerabilitiesMaxFields, relatedVulnerabilitiesMaxFieldsModelPrimitives, RelatedVulnerabilitiesMaxFieldsModelSelector } from "./RelatedVulnerabilitiesMaxFieldsModel.base"

/**
 * RelatedVulnerabilitiesMaxFieldsModel
 *
 * aggregate max on columns
 */
export const RelatedVulnerabilitiesMaxFieldsModel = RelatedVulnerabilitiesMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
