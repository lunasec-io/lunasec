import { Instance } from "mobx-state-tree"
import { ReportsMaxFieldsModelBase } from "./ReportsMaxFieldsModel.base"

/* The TypeScript type of an instance of ReportsMaxFieldsModel */
export interface ReportsMaxFieldsModelType extends Instance<typeof ReportsMaxFieldsModel.Type> {}

/* A graphql query fragment builders for ReportsMaxFieldsModel */
export { selectFromReportsMaxFields, reportsMaxFieldsModelPrimitives, ReportsMaxFieldsModelSelector } from "./ReportsMaxFieldsModel.base"

/**
 * ReportsMaxFieldsModel
 *
 * aggregate max on columns
 */
export const ReportsMaxFieldsModel = ReportsMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
