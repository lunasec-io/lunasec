import { Instance } from "mobx-state-tree"
import { UsersModelBase } from "./UsersModel.base"

/* The TypeScript type of an instance of UsersModel */
export interface UsersModelType extends Instance<typeof UsersModel.Type> {}

/* A graphql query fragment builders for UsersModel */
export { selectFromUsers, usersModelPrimitives, UsersModelSelector } from "./UsersModel.base"

/**
 * UsersModel
 *
 * columns and relationships of "users"
 */
export const UsersModel = UsersModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
