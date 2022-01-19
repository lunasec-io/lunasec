import { Instance } from "mobx-state-tree"
import { PackageVersionsAggregateModelBase } from "./PackageVersionsAggregateModel.base"

/* The TypeScript type of an instance of PackageVersionsAggregateModel */
export interface PackageVersionsAggregateModelType extends Instance<typeof PackageVersionsAggregateModel.Type> {}

/* A graphql query fragment builders for PackageVersionsAggregateModel */
export { selectFromPackageVersionsAggregate, packageVersionsAggregateModelPrimitives, PackageVersionsAggregateModelSelector } from "./PackageVersionsAggregateModel.base"

/**
 * PackageVersionsAggregateModel
 *
 * aggregated selection of "package_versions"
 */
export const PackageVersionsAggregateModel = PackageVersionsAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
