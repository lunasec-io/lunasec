import { Instance } from "mobx-state-tree"
import { FindingsMaxFieldsModelBase } from "./FindingsMaxFieldsModel.base"

/* The TypeScript type of an instance of FindingsMaxFieldsModel */
export interface FindingsMaxFieldsModelType extends Instance<typeof FindingsMaxFieldsModel.Type> {}

/* A graphql query fragment builders for FindingsMaxFieldsModel */
export { selectFromFindingsMaxFields, findingsMaxFieldsModelPrimitives, FindingsMaxFieldsModelSelector } from "./FindingsMaxFieldsModel.base"

/**
 * FindingsMaxFieldsModel
 *
 * aggregate max on columns
 */
export const FindingsMaxFieldsModel = FindingsMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
