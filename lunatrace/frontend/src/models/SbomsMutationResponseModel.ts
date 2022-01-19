import { Instance } from "mobx-state-tree"
import { SbomsMutationResponseModelBase } from "./SbomsMutationResponseModel.base"

/* The TypeScript type of an instance of SbomsMutationResponseModel */
export interface SbomsMutationResponseModelType extends Instance<typeof SbomsMutationResponseModel.Type> {}

/* A graphql query fragment builders for SbomsMutationResponseModel */
export { selectFromSbomsMutationResponse, sbomsMutationResponseModelPrimitives, SbomsMutationResponseModelSelector } from "./SbomsMutationResponseModel.base"

/**
 * SbomsMutationResponseModel
 *
 * response of any mutation on the table "sboms"
 */
export const SbomsMutationResponseModel = SbomsMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
