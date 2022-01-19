import { Instance } from "mobx-state-tree"
import { VulnerabilitiesStddevPopFieldsModelBase } from "./VulnerabilitiesStddevPopFieldsModel.base"

/* The TypeScript type of an instance of VulnerabilitiesStddevPopFieldsModel */
export interface VulnerabilitiesStddevPopFieldsModelType extends Instance<typeof VulnerabilitiesStddevPopFieldsModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesStddevPopFieldsModel */
export { selectFromVulnerabilitiesStddevPopFields, vulnerabilitiesStddevPopFieldsModelPrimitives, VulnerabilitiesStddevPopFieldsModelSelector } from "./VulnerabilitiesStddevPopFieldsModel.base"

/**
 * VulnerabilitiesStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const VulnerabilitiesStddevPopFieldsModel = VulnerabilitiesStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
