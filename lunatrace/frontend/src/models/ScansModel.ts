import { Instance } from "mobx-state-tree"
import { ScansModelBase } from "./ScansModel.base"

/* The TypeScript type of an instance of ScansModel */
export interface ScansModelType extends Instance<typeof ScansModel.Type> {}

/* A graphql query fragment builders for ScansModel */
export { selectFromScans, scansModelPrimitives, ScansModelSelector } from "./ScansModel.base"

/**
 * ScansModel
 *
 * columns and relationships of "scans"
 */
export const ScansModel = ScansModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
