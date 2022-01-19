import { Instance } from "mobx-state-tree"
import { FindingsMutationResponseModelBase } from "./FindingsMutationResponseModel.base"

/* The TypeScript type of an instance of FindingsMutationResponseModel */
export interface FindingsMutationResponseModelType extends Instance<typeof FindingsMutationResponseModel.Type> {}

/* A graphql query fragment builders for FindingsMutationResponseModel */
export { selectFromFindingsMutationResponse, findingsMutationResponseModelPrimitives, FindingsMutationResponseModelSelector } from "./FindingsMutationResponseModel.base"

/**
 * FindingsMutationResponseModel
 *
 * response of any mutation on the table "findings"
 */
export const FindingsMutationResponseModel = FindingsMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
