import { Instance } from "mobx-state-tree"
import { ReportsModelBase } from "./ReportsModel.base"

/* The TypeScript type of an instance of ReportsModel */
export interface ReportsModelType extends Instance<typeof ReportsModel.Type> {}

/* A graphql query fragment builders for ReportsModel */
export { selectFromReports, reportsModelPrimitives, ReportsModelSelector } from "./ReportsModel.base"

/**
 * ReportsModel
 *
 * scan reports   columns and relationships of "reports"
 */
export const ReportsModel = ReportsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
