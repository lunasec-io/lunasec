import { Instance } from "mobx-state-tree"
import { UsersAggregateFieldsModelBase } from "./UsersAggregateFieldsModel.base"

/* The TypeScript type of an instance of UsersAggregateFieldsModel */
export interface UsersAggregateFieldsModelType extends Instance<typeof UsersAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for UsersAggregateFieldsModel */
export { selectFromUsersAggregateFields, usersAggregateFieldsModelPrimitives, UsersAggregateFieldsModelSelector } from "./UsersAggregateFieldsModel.base"

/**
 * UsersAggregateFieldsModel
 *
 * aggregate fields of "users"
 */
export const UsersAggregateFieldsModel = UsersAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
