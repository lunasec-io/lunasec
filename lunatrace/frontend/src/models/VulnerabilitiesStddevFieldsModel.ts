import { Instance } from "mobx-state-tree"
import { VulnerabilitiesStddevFieldsModelBase } from "./VulnerabilitiesStddevFieldsModel.base"

/* The TypeScript type of an instance of VulnerabilitiesStddevFieldsModel */
export interface VulnerabilitiesStddevFieldsModelType extends Instance<typeof VulnerabilitiesStddevFieldsModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesStddevFieldsModel */
export { selectFromVulnerabilitiesStddevFields, vulnerabilitiesStddevFieldsModelPrimitives, VulnerabilitiesStddevFieldsModelSelector } from "./VulnerabilitiesStddevFieldsModel.base"

/**
 * VulnerabilitiesStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const VulnerabilitiesStddevFieldsModel = VulnerabilitiesStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
