import { Instance } from "mobx-state-tree"
import { SbomsAggregateFieldsModelBase } from "./SbomsAggregateFieldsModel.base"

/* The TypeScript type of an instance of SbomsAggregateFieldsModel */
export interface SbomsAggregateFieldsModelType extends Instance<typeof SbomsAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for SbomsAggregateFieldsModel */
export { selectFromSbomsAggregateFields, sbomsAggregateFieldsModelPrimitives, SbomsAggregateFieldsModelSelector } from "./SbomsAggregateFieldsModel.base"

/**
 * SbomsAggregateFieldsModel
 *
 * aggregate fields of "sboms"
 */
export const SbomsAggregateFieldsModel = SbomsAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
