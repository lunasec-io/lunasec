import { Instance } from "mobx-state-tree"
import { SubscriptionRootModelBase } from "./SubscriptionRootModel.base"

/* The TypeScript type of an instance of SubscriptionRootModel */
export interface SubscriptionRootModelType extends Instance<typeof SubscriptionRootModel.Type> {}

/* A graphql query fragment builders for SubscriptionRootModel */
export { selectFromSubscriptionRoot, subscriptionRootModelPrimitives, SubscriptionRootModelSelector } from "./SubscriptionRootModel.base"

/**
 * SubscriptionRootModel
 */
export const SubscriptionRootModel = SubscriptionRootModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
