import { Instance } from "mobx-state-tree"
import { VulnerabilitiesAvgFieldsModelBase } from "./VulnerabilitiesAvgFieldsModel.base"

/* The TypeScript type of an instance of VulnerabilitiesAvgFieldsModel */
export interface VulnerabilitiesAvgFieldsModelType extends Instance<typeof VulnerabilitiesAvgFieldsModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesAvgFieldsModel */
export { selectFromVulnerabilitiesAvgFields, vulnerabilitiesAvgFieldsModelPrimitives, VulnerabilitiesAvgFieldsModelSelector } from "./VulnerabilitiesAvgFieldsModel.base"

/**
 * VulnerabilitiesAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const VulnerabilitiesAvgFieldsModel = VulnerabilitiesAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
