import { Instance } from "mobx-state-tree"
import { ScansMutationResponseModelBase } from "./ScansMutationResponseModel.base"

/* The TypeScript type of an instance of ScansMutationResponseModel */
export interface ScansMutationResponseModelType extends Instance<typeof ScansMutationResponseModel.Type> {}

/* A graphql query fragment builders for ScansMutationResponseModel */
export { selectFromScansMutationResponse, scansMutationResponseModelPrimitives, ScansMutationResponseModelSelector } from "./ScansMutationResponseModel.base"

/**
 * ScansMutationResponseModel
 *
 * response of any mutation on the table "scans"
 */
export const ScansMutationResponseModel = ScansMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
