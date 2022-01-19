import { Instance } from "mobx-state-tree"
import { PackageVersionsMutationResponseModelBase } from "./PackageVersionsMutationResponseModel.base"

/* The TypeScript type of an instance of PackageVersionsMutationResponseModel */
export interface PackageVersionsMutationResponseModelType extends Instance<typeof PackageVersionsMutationResponseModel.Type> {}

/* A graphql query fragment builders for PackageVersionsMutationResponseModel */
export { selectFromPackageVersionsMutationResponse, packageVersionsMutationResponseModelPrimitives, PackageVersionsMutationResponseModelSelector } from "./PackageVersionsMutationResponseModel.base"

/**
 * PackageVersionsMutationResponseModel
 *
 * response of any mutation on the table "package_versions"
 */
export const PackageVersionsMutationResponseModel = PackageVersionsMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
