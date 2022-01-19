import { Instance } from "mobx-state-tree"
import { OrganizationUserAggregateFieldsModelBase } from "./OrganizationUserAggregateFieldsModel.base"

/* The TypeScript type of an instance of OrganizationUserAggregateFieldsModel */
export interface OrganizationUserAggregateFieldsModelType extends Instance<typeof OrganizationUserAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for OrganizationUserAggregateFieldsModel */
export { selectFromOrganizationUserAggregateFields, organizationUserAggregateFieldsModelPrimitives, OrganizationUserAggregateFieldsModelSelector } from "./OrganizationUserAggregateFieldsModel.base"

/**
 * OrganizationUserAggregateFieldsModel
 *
 * aggregate fields of "organization_user"
 */
export const OrganizationUserAggregateFieldsModel = OrganizationUserAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
