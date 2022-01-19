import { Instance } from "mobx-state-tree"
import { UsersMinFieldsModelBase } from "./UsersMinFieldsModel.base"

/* The TypeScript type of an instance of UsersMinFieldsModel */
export interface UsersMinFieldsModelType extends Instance<typeof UsersMinFieldsModel.Type> {}

/* A graphql query fragment builders for UsersMinFieldsModel */
export { selectFromUsersMinFields, usersMinFieldsModelPrimitives, UsersMinFieldsModelSelector } from "./UsersMinFieldsModel.base"

/**
 * UsersMinFieldsModel
 *
 * aggregate min on columns
 */
export const UsersMinFieldsModel = UsersMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
