import { Instance } from "mobx-state-tree"
import { PackageVersionsAggregateFieldsModelBase } from "./PackageVersionsAggregateFieldsModel.base"

/* The TypeScript type of an instance of PackageVersionsAggregateFieldsModel */
export interface PackageVersionsAggregateFieldsModelType extends Instance<typeof PackageVersionsAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for PackageVersionsAggregateFieldsModel */
export { selectFromPackageVersionsAggregateFields, packageVersionsAggregateFieldsModelPrimitives, PackageVersionsAggregateFieldsModelSelector } from "./PackageVersionsAggregateFieldsModel.base"

/**
 * PackageVersionsAggregateFieldsModel
 *
 * aggregate fields of "package_versions"
 */
export const PackageVersionsAggregateFieldsModel = PackageVersionsAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
