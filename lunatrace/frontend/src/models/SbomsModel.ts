import { Instance } from "mobx-state-tree"
import { SbomsModelBase } from "./SbomsModel.base"

/* The TypeScript type of an instance of SbomsModel */
export interface SbomsModelType extends Instance<typeof SbomsModel.Type> {}

/* A graphql query fragment builders for SbomsModel */
export { selectFromSboms, sbomsModelPrimitives, SbomsModelSelector } from "./SbomsModel.base"

/**
 * SbomsModel
 *
 * columns and relationships of "sboms"
 */
export const SbomsModel = SbomsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
