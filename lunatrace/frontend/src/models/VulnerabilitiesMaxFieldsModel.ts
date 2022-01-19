import { Instance } from "mobx-state-tree"
import { VulnerabilitiesMaxFieldsModelBase } from "./VulnerabilitiesMaxFieldsModel.base"

/* The TypeScript type of an instance of VulnerabilitiesMaxFieldsModel */
export interface VulnerabilitiesMaxFieldsModelType extends Instance<typeof VulnerabilitiesMaxFieldsModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesMaxFieldsModel */
export { selectFromVulnerabilitiesMaxFields, vulnerabilitiesMaxFieldsModelPrimitives, VulnerabilitiesMaxFieldsModelSelector } from "./VulnerabilitiesMaxFieldsModel.base"

/**
 * VulnerabilitiesMaxFieldsModel
 *
 * aggregate max on columns
 */
export const VulnerabilitiesMaxFieldsModel = VulnerabilitiesMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
