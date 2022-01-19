import { Instance } from "mobx-state-tree"
import { UsersAggregateModelBase } from "./UsersAggregateModel.base"

/* The TypeScript type of an instance of UsersAggregateModel */
export interface UsersAggregateModelType extends Instance<typeof UsersAggregateModel.Type> {}

/* A graphql query fragment builders for UsersAggregateModel */
export { selectFromUsersAggregate, usersAggregateModelPrimitives, UsersAggregateModelSelector } from "./UsersAggregateModel.base"

/**
 * UsersAggregateModel
 *
 * aggregated selection of "users"
 */
export const UsersAggregateModel = UsersAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
