import { Instance } from "mobx-state-tree"
import { MutationRootModelBase } from "./MutationRootModel.base"

/* The TypeScript type of an instance of MutationRootModel */
export interface MutationRootModelType extends Instance<typeof MutationRootModel.Type> {}

/* A graphql query fragment builders for MutationRootModel */
export { selectFromMutationRoot, mutationRootModelPrimitives, MutationRootModelSelector } from "./MutationRootModel.base"

/**
 * MutationRootModel
 *
 * mutation root
 */
export const MutationRootModel = MutationRootModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
