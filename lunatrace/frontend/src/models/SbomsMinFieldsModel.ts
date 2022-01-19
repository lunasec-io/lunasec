import { Instance } from "mobx-state-tree"
import { SbomsMinFieldsModelBase } from "./SbomsMinFieldsModel.base"

/* The TypeScript type of an instance of SbomsMinFieldsModel */
export interface SbomsMinFieldsModelType extends Instance<typeof SbomsMinFieldsModel.Type> {}

/* A graphql query fragment builders for SbomsMinFieldsModel */
export { selectFromSbomsMinFields, sbomsMinFieldsModelPrimitives, SbomsMinFieldsModelSelector } from "./SbomsMinFieldsModel.base"

/**
 * SbomsMinFieldsModel
 *
 * aggregate min on columns
 */
export const SbomsMinFieldsModel = SbomsMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
