import { Instance } from "mobx-state-tree"
import { VulnerabilitiesModelBase } from "./VulnerabilitiesModel.base"

/* The TypeScript type of an instance of VulnerabilitiesModel */
export interface VulnerabilitiesModelType extends Instance<typeof VulnerabilitiesModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesModel */
export { selectFromVulnerabilities, vulnerabilitiesModelPrimitives, VulnerabilitiesModelSelector } from "./VulnerabilitiesModel.base"

/**
 * VulnerabilitiesModel
 *
 * columns and relationships of "vulnerabilities"
 */
export const VulnerabilitiesModel = VulnerabilitiesModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
