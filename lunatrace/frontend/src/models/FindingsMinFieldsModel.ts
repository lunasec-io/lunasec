import { Instance } from "mobx-state-tree"
import { FindingsMinFieldsModelBase } from "./FindingsMinFieldsModel.base"

/* The TypeScript type of an instance of FindingsMinFieldsModel */
export interface FindingsMinFieldsModelType extends Instance<typeof FindingsMinFieldsModel.Type> {}

/* A graphql query fragment builders for FindingsMinFieldsModel */
export { selectFromFindingsMinFields, findingsMinFieldsModelPrimitives, FindingsMinFieldsModelSelector } from "./FindingsMinFieldsModel.base"

/**
 * FindingsMinFieldsModel
 *
 * aggregate min on columns
 */
export const FindingsMinFieldsModel = FindingsMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
