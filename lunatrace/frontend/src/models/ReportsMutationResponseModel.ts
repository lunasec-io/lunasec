import { Instance } from "mobx-state-tree"
import { ReportsMutationResponseModelBase } from "./ReportsMutationResponseModel.base"

/* The TypeScript type of an instance of ReportsMutationResponseModel */
export interface ReportsMutationResponseModelType extends Instance<typeof ReportsMutationResponseModel.Type> {}

/* A graphql query fragment builders for ReportsMutationResponseModel */
export { selectFromReportsMutationResponse, reportsMutationResponseModelPrimitives, ReportsMutationResponseModelSelector } from "./ReportsMutationResponseModel.base"

/**
 * ReportsMutationResponseModel
 *
 * response of any mutation on the table "reports"
 */
export const ReportsMutationResponseModel = ReportsMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
