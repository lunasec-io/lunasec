import { Instance } from "mobx-state-tree"
import { OrganizationUserAggregateModelBase } from "./OrganizationUserAggregateModel.base"

/* The TypeScript type of an instance of OrganizationUserAggregateModel */
export interface OrganizationUserAggregateModelType extends Instance<typeof OrganizationUserAggregateModel.Type> {}

/* A graphql query fragment builders for OrganizationUserAggregateModel */
export { selectFromOrganizationUserAggregate, organizationUserAggregateModelPrimitives, OrganizationUserAggregateModelSelector } from "./OrganizationUserAggregateModel.base"

/**
 * OrganizationUserAggregateModel
 *
 * aggregated selection of "organization_user"
 */
export const OrganizationUserAggregateModel = OrganizationUserAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
