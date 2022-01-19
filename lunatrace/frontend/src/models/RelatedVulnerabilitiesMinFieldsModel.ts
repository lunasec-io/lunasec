import { Instance } from "mobx-state-tree"
import { RelatedVulnerabilitiesMinFieldsModelBase } from "./RelatedVulnerabilitiesMinFieldsModel.base"

/* The TypeScript type of an instance of RelatedVulnerabilitiesMinFieldsModel */
export interface RelatedVulnerabilitiesMinFieldsModelType extends Instance<typeof RelatedVulnerabilitiesMinFieldsModel.Type> {}

/* A graphql query fragment builders for RelatedVulnerabilitiesMinFieldsModel */
export { selectFromRelatedVulnerabilitiesMinFields, relatedVulnerabilitiesMinFieldsModelPrimitives, RelatedVulnerabilitiesMinFieldsModelSelector } from "./RelatedVulnerabilitiesMinFieldsModel.base"

/**
 * RelatedVulnerabilitiesMinFieldsModel
 *
 * aggregate min on columns
 */
export const RelatedVulnerabilitiesMinFieldsModel = RelatedVulnerabilitiesMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
