import { Instance } from "mobx-state-tree"
import { VulnerabilitiesAggregateFieldsModelBase } from "./VulnerabilitiesAggregateFieldsModel.base"

/* The TypeScript type of an instance of VulnerabilitiesAggregateFieldsModel */
export interface VulnerabilitiesAggregateFieldsModelType extends Instance<typeof VulnerabilitiesAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesAggregateFieldsModel */
export { selectFromVulnerabilitiesAggregateFields, vulnerabilitiesAggregateFieldsModelPrimitives, VulnerabilitiesAggregateFieldsModelSelector } from "./VulnerabilitiesAggregateFieldsModel.base"

/**
 * VulnerabilitiesAggregateFieldsModel
 *
 * aggregate fields of "vulnerabilities"
 */
export const VulnerabilitiesAggregateFieldsModel = VulnerabilitiesAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
