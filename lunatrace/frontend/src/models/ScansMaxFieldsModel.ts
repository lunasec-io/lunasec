import { Instance } from "mobx-state-tree"
import { ScansMaxFieldsModelBase } from "./ScansMaxFieldsModel.base"

/* The TypeScript type of an instance of ScansMaxFieldsModel */
export interface ScansMaxFieldsModelType extends Instance<typeof ScansMaxFieldsModel.Type> {}

/* A graphql query fragment builders for ScansMaxFieldsModel */
export { selectFromScansMaxFields, scansMaxFieldsModelPrimitives, ScansMaxFieldsModelSelector } from "./ScansMaxFieldsModel.base"

/**
 * ScansMaxFieldsModel
 *
 * aggregate max on columns
 */
export const ScansMaxFieldsModel = ScansMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
