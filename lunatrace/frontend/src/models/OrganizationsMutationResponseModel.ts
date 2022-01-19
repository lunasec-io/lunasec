import { Instance } from "mobx-state-tree"
import { OrganizationsMutationResponseModelBase } from "./OrganizationsMutationResponseModel.base"

/* The TypeScript type of an instance of OrganizationsMutationResponseModel */
export interface OrganizationsMutationResponseModelType extends Instance<typeof OrganizationsMutationResponseModel.Type> {}

/* A graphql query fragment builders for OrganizationsMutationResponseModel */
export { selectFromOrganizationsMutationResponse, organizationsMutationResponseModelPrimitives, OrganizationsMutationResponseModelSelector } from "./OrganizationsMutationResponseModel.base"

/**
 * OrganizationsMutationResponseModel
 *
 * response of any mutation on the table "organizations"
 */
export const OrganizationsMutationResponseModel = OrganizationsMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
