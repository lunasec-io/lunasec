import { Instance } from "mobx-state-tree"
import { VulnerabilitiesSumFieldsModelBase } from "./VulnerabilitiesSumFieldsModel.base"

/* The TypeScript type of an instance of VulnerabilitiesSumFieldsModel */
export interface VulnerabilitiesSumFieldsModelType extends Instance<typeof VulnerabilitiesSumFieldsModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesSumFieldsModel */
export { selectFromVulnerabilitiesSumFields, vulnerabilitiesSumFieldsModelPrimitives, VulnerabilitiesSumFieldsModelSelector } from "./VulnerabilitiesSumFieldsModel.base"

/**
 * VulnerabilitiesSumFieldsModel
 *
 * aggregate sum on columns
 */
export const VulnerabilitiesSumFieldsModel = VulnerabilitiesSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
