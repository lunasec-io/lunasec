import { Instance } from "mobx-state-tree"
import { ScansAggregateFieldsModelBase } from "./ScansAggregateFieldsModel.base"

/* The TypeScript type of an instance of ScansAggregateFieldsModel */
export interface ScansAggregateFieldsModelType extends Instance<typeof ScansAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for ScansAggregateFieldsModel */
export { selectFromScansAggregateFields, scansAggregateFieldsModelPrimitives, ScansAggregateFieldsModelSelector } from "./ScansAggregateFieldsModel.base"

/**
 * ScansAggregateFieldsModel
 *
 * aggregate fields of "scans"
 */
export const ScansAggregateFieldsModel = ScansAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
