import { Instance } from "mobx-state-tree"
import { FindingsModelBase } from "./FindingsModel.base"

/* The TypeScript type of an instance of FindingsModel */
export interface FindingsModelType extends Instance<typeof FindingsModel.Type> {}

/* A graphql query fragment builders for FindingsModel */
export { selectFromFindings, findingsModelPrimitives, FindingsModelSelector } from "./FindingsModel.base"

/**
 * FindingsModel
 *
 * columns and relationships of "findings"
 */
export const FindingsModel = FindingsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
