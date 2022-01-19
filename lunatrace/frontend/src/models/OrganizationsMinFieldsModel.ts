import { Instance } from "mobx-state-tree"
import { OrganizationsMinFieldsModelBase } from "./OrganizationsMinFieldsModel.base"

/* The TypeScript type of an instance of OrganizationsMinFieldsModel */
export interface OrganizationsMinFieldsModelType extends Instance<typeof OrganizationsMinFieldsModel.Type> {}

/* A graphql query fragment builders for OrganizationsMinFieldsModel */
export { selectFromOrganizationsMinFields, organizationsMinFieldsModelPrimitives, OrganizationsMinFieldsModelSelector } from "./OrganizationsMinFieldsModel.base"

/**
 * OrganizationsMinFieldsModel
 *
 * aggregate min on columns
 */
export const OrganizationsMinFieldsModel = OrganizationsMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
