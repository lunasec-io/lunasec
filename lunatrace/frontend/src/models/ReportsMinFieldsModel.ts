import { Instance } from "mobx-state-tree"
import { ReportsMinFieldsModelBase } from "./ReportsMinFieldsModel.base"

/* The TypeScript type of an instance of ReportsMinFieldsModel */
export interface ReportsMinFieldsModelType extends Instance<typeof ReportsMinFieldsModel.Type> {}

/* A graphql query fragment builders for ReportsMinFieldsModel */
export { selectFromReportsMinFields, reportsMinFieldsModelPrimitives, ReportsMinFieldsModelSelector } from "./ReportsMinFieldsModel.base"

/**
 * ReportsMinFieldsModel
 *
 * aggregate min on columns
 */
export const ReportsMinFieldsModel = ReportsMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
