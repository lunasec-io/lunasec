import { Instance } from "mobx-state-tree"
import { PackageVersionsMaxFieldsModelBase } from "./PackageVersionsMaxFieldsModel.base"

/* The TypeScript type of an instance of PackageVersionsMaxFieldsModel */
export interface PackageVersionsMaxFieldsModelType extends Instance<typeof PackageVersionsMaxFieldsModel.Type> {}

/* A graphql query fragment builders for PackageVersionsMaxFieldsModel */
export { selectFromPackageVersionsMaxFields, packageVersionsMaxFieldsModelPrimitives, PackageVersionsMaxFieldsModelSelector } from "./PackageVersionsMaxFieldsModel.base"

/**
 * PackageVersionsMaxFieldsModel
 *
 * aggregate max on columns
 */
export const PackageVersionsMaxFieldsModel = PackageVersionsMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
