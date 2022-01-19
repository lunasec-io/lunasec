import { Instance } from "mobx-state-tree"
import { OrganizationsAggregateFieldsModelBase } from "./OrganizationsAggregateFieldsModel.base"

/* The TypeScript type of an instance of OrganizationsAggregateFieldsModel */
export interface OrganizationsAggregateFieldsModelType extends Instance<typeof OrganizationsAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for OrganizationsAggregateFieldsModel */
export { selectFromOrganizationsAggregateFields, organizationsAggregateFieldsModelPrimitives, OrganizationsAggregateFieldsModelSelector } from "./OrganizationsAggregateFieldsModel.base"

/**
 * OrganizationsAggregateFieldsModel
 *
 * aggregate fields of "organizations"
 */
export const OrganizationsAggregateFieldsModel = OrganizationsAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
