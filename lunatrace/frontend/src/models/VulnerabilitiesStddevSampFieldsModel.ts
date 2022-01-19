import { Instance } from "mobx-state-tree"
import { VulnerabilitiesStddevSampFieldsModelBase } from "./VulnerabilitiesStddevSampFieldsModel.base"

/* The TypeScript type of an instance of VulnerabilitiesStddevSampFieldsModel */
export interface VulnerabilitiesStddevSampFieldsModelType extends Instance<typeof VulnerabilitiesStddevSampFieldsModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesStddevSampFieldsModel */
export { selectFromVulnerabilitiesStddevSampFields, vulnerabilitiesStddevSampFieldsModelPrimitives, VulnerabilitiesStddevSampFieldsModelSelector } from "./VulnerabilitiesStddevSampFieldsModel.base"

/**
 * VulnerabilitiesStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const VulnerabilitiesStddevSampFieldsModel = VulnerabilitiesStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
