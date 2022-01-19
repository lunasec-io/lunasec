import { Instance } from "mobx-state-tree"
import { OrganizationUserMaxFieldsModelBase } from "./OrganizationUserMaxFieldsModel.base"

/* The TypeScript type of an instance of OrganizationUserMaxFieldsModel */
export interface OrganizationUserMaxFieldsModelType extends Instance<typeof OrganizationUserMaxFieldsModel.Type> {}

/* A graphql query fragment builders for OrganizationUserMaxFieldsModel */
export { selectFromOrganizationUserMaxFields, organizationUserMaxFieldsModelPrimitives, OrganizationUserMaxFieldsModelSelector } from "./OrganizationUserMaxFieldsModel.base"

/**
 * OrganizationUserMaxFieldsModel
 *
 * aggregate max on columns
 */
export const OrganizationUserMaxFieldsModel = OrganizationUserMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
