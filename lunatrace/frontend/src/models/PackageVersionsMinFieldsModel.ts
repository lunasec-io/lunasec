import { Instance } from "mobx-state-tree"
import { PackageVersionsMinFieldsModelBase } from "./PackageVersionsMinFieldsModel.base"

/* The TypeScript type of an instance of PackageVersionsMinFieldsModel */
export interface PackageVersionsMinFieldsModelType extends Instance<typeof PackageVersionsMinFieldsModel.Type> {}

/* A graphql query fragment builders for PackageVersionsMinFieldsModel */
export { selectFromPackageVersionsMinFields, packageVersionsMinFieldsModelPrimitives, PackageVersionsMinFieldsModelSelector } from "./PackageVersionsMinFieldsModel.base"

/**
 * PackageVersionsMinFieldsModel
 *
 * aggregate min on columns
 */
export const PackageVersionsMinFieldsModel = PackageVersionsMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
