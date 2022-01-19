import { Instance } from "mobx-state-tree"
import { VulnerabilitiesMutationResponseModelBase } from "./VulnerabilitiesMutationResponseModel.base"

/* The TypeScript type of an instance of VulnerabilitiesMutationResponseModel */
export interface VulnerabilitiesMutationResponseModelType extends Instance<typeof VulnerabilitiesMutationResponseModel.Type> {}

/* A graphql query fragment builders for VulnerabilitiesMutationResponseModel */
export { selectFromVulnerabilitiesMutationResponse, vulnerabilitiesMutationResponseModelPrimitives, VulnerabilitiesMutationResponseModelSelector } from "./VulnerabilitiesMutationResponseModel.base"

/**
 * VulnerabilitiesMutationResponseModel
 *
 * response of any mutation on the table "vulnerabilities"
 */
export const VulnerabilitiesMutationResponseModel = VulnerabilitiesMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
