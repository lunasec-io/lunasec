import { Instance } from "mobx-state-tree"
import { OrganizationUserModelBase } from "./OrganizationUserModel.base"

/* The TypeScript type of an instance of OrganizationUserModel */
export interface OrganizationUserModelType extends Instance<typeof OrganizationUserModel.Type> {}

/* A graphql query fragment builders for OrganizationUserModel */
export { selectFromOrganizationUser, organizationUserModelPrimitives, OrganizationUserModelSelector } from "./OrganizationUserModel.base"

/**
 * OrganizationUserModel
 *
 * join table   columns and relationships of "organization_user"
 */
export const OrganizationUserModel = OrganizationUserModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
