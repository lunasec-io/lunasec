import { Instance } from "mobx-state-tree"
import { VulnerabilitiesVarianceFieldsModelBase } from "./VulnerabilitiesVarianceFieldsModel.base"

/* The TypeScript type of an instance of VulnerabilitiesVarianceFieldsModel */
export interface VulnerabilitiesVarianceFieldsModelType extends Instance<typeof VulnerabilitiesVarianceFieldsModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesVarianceFieldsModel */
export { selectFromVulnerabilitiesVarianceFields, vulnerabilitiesVarianceFieldsModelPrimitives, VulnerabilitiesVarianceFieldsModelSelector } from "./VulnerabilitiesVarianceFieldsModel.base"

/**
 * VulnerabilitiesVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const VulnerabilitiesVarianceFieldsModel = VulnerabilitiesVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
