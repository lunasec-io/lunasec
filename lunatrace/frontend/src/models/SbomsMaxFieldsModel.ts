import { Instance } from "mobx-state-tree"
import { SbomsMaxFieldsModelBase } from "./SbomsMaxFieldsModel.base"

/* The TypeScript type of an instance of SbomsMaxFieldsModel */
export interface SbomsMaxFieldsModelType extends Instance<typeof SbomsMaxFieldsModel.Type> {}

/* A graphql query fragment builders for SbomsMaxFieldsModel */
export { selectFromSbomsMaxFields, sbomsMaxFieldsModelPrimitives, SbomsMaxFieldsModelSelector } from "./SbomsMaxFieldsModel.base"

/**
 * SbomsMaxFieldsModel
 *
 * aggregate max on columns
 */
export const SbomsMaxFieldsModel = SbomsMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
