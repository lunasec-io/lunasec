import { Instance } from "mobx-state-tree"
import { UsersMaxFieldsModelBase } from "./UsersMaxFieldsModel.base"

/* The TypeScript type of an instance of UsersMaxFieldsModel */
export interface UsersMaxFieldsModelType extends Instance<typeof UsersMaxFieldsModel.Type> {}

/* A graphql query fragment builders for UsersMaxFieldsModel */
export { selectFromUsersMaxFields, usersMaxFieldsModelPrimitives, UsersMaxFieldsModelSelector } from "./UsersMaxFieldsModel.base"

/**
 * UsersMaxFieldsModel
 *
 * aggregate max on columns
 */
export const UsersMaxFieldsModel = UsersMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
