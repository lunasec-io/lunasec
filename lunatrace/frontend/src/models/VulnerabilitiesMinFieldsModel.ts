import { Instance } from "mobx-state-tree"
import { VulnerabilitiesMinFieldsModelBase } from "./VulnerabilitiesMinFieldsModel.base"

/* The TypeScript type of an instance of VulnerabilitiesMinFieldsModel */
export interface VulnerabilitiesMinFieldsModelType extends Instance<typeof VulnerabilitiesMinFieldsModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesMinFieldsModel */
export { selectFromVulnerabilitiesMinFields, vulnerabilitiesMinFieldsModelPrimitives, VulnerabilitiesMinFieldsModelSelector } from "./VulnerabilitiesMinFieldsModel.base"

/**
 * VulnerabilitiesMinFieldsModel
 *
 * aggregate min on columns
 */
export const VulnerabilitiesMinFieldsModel = VulnerabilitiesMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
