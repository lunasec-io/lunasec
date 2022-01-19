import { Instance } from "mobx-state-tree"
import { OrganizationUserMutationResponseModelBase } from "./OrganizationUserMutationResponseModel.base"

/* The TypeScript type of an instance of OrganizationUserMutationResponseModel */
export interface OrganizationUserMutationResponseModelType extends Instance<typeof OrganizationUserMutationResponseModel.Type> {}

/* A graphql query fragment builders for OrganizationUserMutationResponseModel */
export { selectFromOrganizationUserMutationResponse, organizationUserMutationResponseModelPrimitives, OrganizationUserMutationResponseModelSelector } from "./OrganizationUserMutationResponseModel.base"

/**
 * OrganizationUserMutationResponseModel
 *
 * response of any mutation on the table "organization_user"
 */
export const OrganizationUserMutationResponseModel = OrganizationUserMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
