import { Instance } from "mobx-state-tree"
import { FindingsAggregateFieldsModelBase } from "./FindingsAggregateFieldsModel.base"

/* The TypeScript type of an instance of FindingsAggregateFieldsModel */
export interface FindingsAggregateFieldsModelType extends Instance<typeof FindingsAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for FindingsAggregateFieldsModel */
export { selectFromFindingsAggregateFields, findingsAggregateFieldsModelPrimitives, FindingsAggregateFieldsModelSelector } from "./FindingsAggregateFieldsModel.base"

/**
 * FindingsAggregateFieldsModel
 *
 * aggregate fields of "findings"
 */
export const FindingsAggregateFieldsModel = FindingsAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
