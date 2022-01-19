import { Instance } from "mobx-state-tree"
import { PackageVersionsModelBase } from "./PackageVersionsModel.base"

/* The TypeScript type of an instance of PackageVersionsModel */
export interface PackageVersionsModelType extends Instance<typeof PackageVersionsModel.Type> {}

/* A graphql query fragment builders for PackageVersionsModel */
export { selectFromPackageVersions, packageVersionsModelPrimitives, PackageVersionsModelSelector } from "./PackageVersionsModel.base"

/**
 * PackageVersionsModel
 *
 * columns and relationships of "package_versions"
 */
export const PackageVersionsModel = PackageVersionsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
