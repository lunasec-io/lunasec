import { Instance } from "mobx-state-tree"
import { QueryRootModelBase } from "./QueryRootModel.base"

/* The TypeScript type of an instance of QueryRootModel */
export interface QueryRootModelType extends Instance<typeof QueryRootModel.Type> {}

/* A graphql query fragment builders for QueryRootModel */
export { selectFromQueryRoot, queryRootModelPrimitives, QueryRootModelSelector } from "./QueryRootModel.base"

/**
 * QueryRootModel
 */
export const QueryRootModel = QueryRootModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
