import { Instance } from "mobx-state-tree"
import { UsersMutationResponseModelBase } from "./UsersMutationResponseModel.base"

/* The TypeScript type of an instance of UsersMutationResponseModel */
export interface UsersMutationResponseModelType extends Instance<typeof UsersMutationResponseModel.Type> {}

/* A graphql query fragment builders for UsersMutationResponseModel */
export { selectFromUsersMutationResponse, usersMutationResponseModelPrimitives, UsersMutationResponseModelSelector } from "./UsersMutationResponseModel.base"

/**
 * UsersMutationResponseModel
 *
 * response of any mutation on the table "users"
 */
export const UsersMutationResponseModel = UsersMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
