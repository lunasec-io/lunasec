import { Instance } from "mobx-state-tree"
import { ScansMinFieldsModelBase } from "./ScansMinFieldsModel.base"

/* The TypeScript type of an instance of ScansMinFieldsModel */
export interface ScansMinFieldsModelType extends Instance<typeof ScansMinFieldsModel.Type> {}

/* A graphql query fragment builders for ScansMinFieldsModel */
export { selectFromScansMinFields, scansMinFieldsModelPrimitives, ScansMinFieldsModelSelector } from "./ScansMinFieldsModel.base"

/**
 * ScansMinFieldsModel
 *
 * aggregate min on columns
 */
export const ScansMinFieldsModel = ScansMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
