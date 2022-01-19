import { Instance } from "mobx-state-tree"
import { OrganizationsModelBase } from "./OrganizationsModel.base"

/* The TypeScript type of an instance of OrganizationsModel */
export interface OrganizationsModelType extends Instance<typeof OrganizationsModel.Type> {}

/* A graphql query fragment builders for OrganizationsModel */
export { selectFromOrganizations, organizationsModelPrimitives, OrganizationsModelSelector } from "./OrganizationsModel.base"

/**
 * OrganizationsModel
 *
 * columns and relationships of "organizations"
 */
export const OrganizationsModel = OrganizationsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
