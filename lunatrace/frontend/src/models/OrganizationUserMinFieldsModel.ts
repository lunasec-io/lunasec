import { Instance } from "mobx-state-tree"
import { OrganizationUserMinFieldsModelBase } from "./OrganizationUserMinFieldsModel.base"

/* The TypeScript type of an instance of OrganizationUserMinFieldsModel */
export interface OrganizationUserMinFieldsModelType extends Instance<typeof OrganizationUserMinFieldsModel.Type> {}

/* A graphql query fragment builders for OrganizationUserMinFieldsModel */
export { selectFromOrganizationUserMinFields, organizationUserMinFieldsModelPrimitives, OrganizationUserMinFieldsModelSelector } from "./OrganizationUserMinFieldsModel.base"

/**
 * OrganizationUserMinFieldsModel
 *
 * aggregate min on columns
 */
export const OrganizationUserMinFieldsModel = OrganizationUserMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
