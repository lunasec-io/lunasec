import { Instance } from "mobx-state-tree"
import { OrganizationsMaxFieldsModelBase } from "./OrganizationsMaxFieldsModel.base"

/* The TypeScript type of an instance of OrganizationsMaxFieldsModel */
export interface OrganizationsMaxFieldsModelType extends Instance<typeof OrganizationsMaxFieldsModel.Type> {}

/* A graphql query fragment builders for OrganizationsMaxFieldsModel */
export { selectFromOrganizationsMaxFields, organizationsMaxFieldsModelPrimitives, OrganizationsMaxFieldsModelSelector } from "./OrganizationsMaxFieldsModel.base"

/**
 * OrganizationsMaxFieldsModel
 *
 * aggregate max on columns
 */
export const OrganizationsMaxFieldsModel = OrganizationsMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
