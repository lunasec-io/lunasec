import { Instance } from "mobx-state-tree"
import { OrganizationsAggregateModelBase } from "./OrganizationsAggregateModel.base"

/* The TypeScript type of an instance of OrganizationsAggregateModel */
export interface OrganizationsAggregateModelType extends Instance<typeof OrganizationsAggregateModel.Type> {}

/* A graphql query fragment builders for OrganizationsAggregateModel */
export { selectFromOrganizationsAggregate, organizationsAggregateModelPrimitives, OrganizationsAggregateModelSelector } from "./OrganizationsAggregateModel.base"

/**
 * OrganizationsAggregateModel
 *
 * aggregated selection of "organizations"
 */
export const OrganizationsAggregateModel = OrganizationsAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
