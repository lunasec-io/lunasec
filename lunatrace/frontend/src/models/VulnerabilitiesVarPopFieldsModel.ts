import { Instance } from "mobx-state-tree"
import { VulnerabilitiesVarPopFieldsModelBase } from "./VulnerabilitiesVarPopFieldsModel.base"

/* The TypeScript type of an instance of VulnerabilitiesVarPopFieldsModel */
export interface VulnerabilitiesVarPopFieldsModelType extends Instance<typeof VulnerabilitiesVarPopFieldsModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesVarPopFieldsModel */
export { selectFromVulnerabilitiesVarPopFields, vulnerabilitiesVarPopFieldsModelPrimitives, VulnerabilitiesVarPopFieldsModelSelector } from "./VulnerabilitiesVarPopFieldsModel.base"

/**
 * VulnerabilitiesVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const VulnerabilitiesVarPopFieldsModel = VulnerabilitiesVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
