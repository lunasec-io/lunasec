import { Instance } from "mobx-state-tree"
import { VulnerabilitiesVarSampFieldsModelBase } from "./VulnerabilitiesVarSampFieldsModel.base"

/* The TypeScript type of an instance of VulnerabilitiesVarSampFieldsModel */
export interface VulnerabilitiesVarSampFieldsModelType extends Instance<typeof VulnerabilitiesVarSampFieldsModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesVarSampFieldsModel */
export { selectFromVulnerabilitiesVarSampFields, vulnerabilitiesVarSampFieldsModelPrimitives, VulnerabilitiesVarSampFieldsModelSelector } from "./VulnerabilitiesVarSampFieldsModel.base"

/**
 * VulnerabilitiesVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const VulnerabilitiesVarSampFieldsModel = VulnerabilitiesVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
